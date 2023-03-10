import {Component, OnInit} from '@angular/core';
import {FreeTrialStudentWhatsTemplateService} from 'src/app/controller/service/FreeTrialStudentWhatsTemplate.service';
import {FreeTrialStudentWhatsTemplateDto} from 'src/app/controller/model/FreeTrialStudentWhatsTemplate.model';
import {FreeTrialStudentWhatsTemplateCriteria} from 'src/app/controller/criteria/FreeTrialStudentWhatsTemplateCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';




import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-free-trial-student-whats-template-list-admin',
  templateUrl: './free-trial-student-whats-template-list-admin.component.html'
})
export class FreeTrialStudentWhatsTemplateListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FreeTrialStudentWhatsTemplate';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private freeTrialStudentWhatsTemplateService: FreeTrialStudentWhatsTemplateService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadFreeTrialStudentWhatsTemplates(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentWhatsTemplate', 'list');
        isPermistted ? this.freeTrialStudentWhatsTemplateService.findAll().subscribe(freeTrialStudentWhatsTemplates => this.freeTrialStudentWhatsTemplates = freeTrialStudentWhatsTemplates,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.freeTrialStudentWhatsTemplateService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.freeTrialStudentWhatsTemplates = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new FreeTrialStudentWhatsTemplateCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'object', header: 'Object'},
            {field: 'source', header: 'Source'},
        ];
    }
    
    public async editFreeTrialStudentWhatsTemplate(freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentWhatsTemplate', 'edit');
        if(isPermistted){
              this.freeTrialStudentWhatsTemplateService.findByIdWithAssociatedList(freeTrialStudentWhatsTemplate).subscribe(res => {
              this.selectedFreeTrialStudentWhatsTemplate = res;

              this.editFreeTrialStudentWhatsTemplateDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewFreeTrialStudentWhatsTemplate(freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentWhatsTemplate', 'view');
        if(isPermistted){
           this.freeTrialStudentWhatsTemplateService.findByIdWithAssociatedList(freeTrialStudentWhatsTemplate).subscribe(res => {
           this.selectedFreeTrialStudentWhatsTemplate = res;
            this.viewFreeTrialStudentWhatsTemplateDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateFreeTrialStudentWhatsTemplate(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedFreeTrialStudentWhatsTemplate = new FreeTrialStudentWhatsTemplateDto();
            this.createFreeTrialStudentWhatsTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentWhatsTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.freeTrialStudentWhatsTemplateService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.freeTrialStudentWhatsTemplates.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.freeTrialStudentWhatsTemplates.splice(index,1);
                                    }
                                }
                            });
                        }
            });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.freeTrialStudentWhatsTemplateSelections == null || this.freeTrialStudentWhatsTemplateSelections.length==0
    }


    public async deleteFreeTrialStudentWhatsTemplate(freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateDto){
       const isPermistted = await this.roleService.isPermitted('FreeTrialStudentWhatsTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Free trial student whats template) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.freeTrialStudentWhatsTemplateService.delete(freeTrialStudentWhatsTemplate).subscribe(status=>{
              if(status > 0){
                  const position = this.freeTrialStudentWhatsTemplates.indexOf(freeTrialStudentWhatsTemplate);
                  position > -1 ? this.freeTrialStudentWhatsTemplates.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Free trial student whats template Supprimé',
                    life: 3000
                  });
              }

        },error=>console.log(error))
                 }
            });
    }else{
    this.messageService.add({
    severity: 'error', summary: 'erreur', detail: 'Problème de permission'
    });
    }
    }


    public async duplicateFreeTrialStudentWhatsTemplate(freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateDto) {
        this.freeTrialStudentWhatsTemplateService.findByIdWithAssociatedList(freeTrialStudentWhatsTemplate).subscribe(
	    res => {
	       this.initDuplicateFreeTrialStudentWhatsTemplate(res);
	       this.selectedFreeTrialStudentWhatsTemplate = res;
	       this.selectedFreeTrialStudentWhatsTemplate.id = null;


            this.createFreeTrialStudentWhatsTemplateDialog = true;
        });

	}

	initDuplicateFreeTrialStudentWhatsTemplate(res: FreeTrialStudentWhatsTemplateDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.freeTrialStudentWhatsTemplates.map(e => {
            return {
                 'Object': e.object ,
                 'Corps': e.corps ,
                 'Source': e.source ,
            }
        });

        this.criteriaData = [{
            'Object': this.search.object ? this.search.object : environment.emptyForExport ,
            'Corps': this.search.corps ? this.search.corps : environment.emptyForExport ,
            'Source': this.search.source ? this.search.source : environment.emptyForExport ,
        }];
      }

    get freeTrialStudentWhatsTemplates() : Array<FreeTrialStudentWhatsTemplateDto> {
           return this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates;
    }
    set freeTrialStudentWhatsTemplates(value: Array<FreeTrialStudentWhatsTemplateDto>) {
        this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates = value;
    }

    get freeTrialStudentWhatsTemplateSelections() : Array<FreeTrialStudentWhatsTemplateDto> {
           return this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplateSelections;
    }
    set freeTrialStudentWhatsTemplateSelections(value: Array<FreeTrialStudentWhatsTemplateDto>) {
        this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplateSelections = value;
    }

    get selectedFreeTrialStudentWhatsTemplate() : FreeTrialStudentWhatsTemplateDto {
           return this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate;
    }
    set selectedFreeTrialStudentWhatsTemplate(value: FreeTrialStudentWhatsTemplateDto) {
        this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate = value;
    }
    
    get createFreeTrialStudentWhatsTemplateDialog() :boolean {
           return this.freeTrialStudentWhatsTemplateService.createFreeTrialStudentWhatsTemplateDialog;
    }
    set createFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this.freeTrialStudentWhatsTemplateService.createFreeTrialStudentWhatsTemplateDialog= value;
    }
    
    get editFreeTrialStudentWhatsTemplateDialog() :boolean {
           return this.freeTrialStudentWhatsTemplateService.editFreeTrialStudentWhatsTemplateDialog;
    }
    set editFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this.freeTrialStudentWhatsTemplateService.editFreeTrialStudentWhatsTemplateDialog= value;
    }
    get viewFreeTrialStudentWhatsTemplateDialog() :boolean {
           return this.freeTrialStudentWhatsTemplateService.viewFreeTrialStudentWhatsTemplateDialog;
    }
    set viewFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this.freeTrialStudentWhatsTemplateService.viewFreeTrialStudentWhatsTemplateDialog = value;
    }
       
     get search() : FreeTrialStudentWhatsTemplateCriteria {
        return this.freeTrialStudentWhatsTemplateService.search;
     }
    set search(value: FreeTrialStudentWhatsTemplateCriteria) {
        this.freeTrialStudentWhatsTemplateService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
