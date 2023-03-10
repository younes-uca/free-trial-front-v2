import {Component, OnInit} from '@angular/core';
import {FreeTrialTeacherWhatsTemplateService} from 'src/app/controller/service/FreeTrialTeacherWhatsTemplate.service';
import {FreeTrialTeacherWhatsTemplateDto} from 'src/app/controller/model/FreeTrialTeacherWhatsTemplate.model';
import {FreeTrialTeacherWhatsTemplateCriteria} from 'src/app/controller/criteria/FreeTrialTeacherWhatsTemplateCriteria.model';
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
  selector: 'app-free-trial-teacher-whats-template-list-admin',
  templateUrl: './free-trial-teacher-whats-template-list-admin.component.html'
})
export class FreeTrialTeacherWhatsTemplateListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FreeTrialTeacherWhatsTemplate';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private freeTrialTeacherWhatsTemplateService: FreeTrialTeacherWhatsTemplateService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadFreeTrialTeacherWhatsTemplates(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherWhatsTemplate', 'list');
        isPermistted ? this.freeTrialTeacherWhatsTemplateService.findAll().subscribe(freeTrialTeacherWhatsTemplates => this.freeTrialTeacherWhatsTemplates = freeTrialTeacherWhatsTemplates,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.freeTrialTeacherWhatsTemplateService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.freeTrialTeacherWhatsTemplates = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new FreeTrialTeacherWhatsTemplateCriteria();
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
    
    public async editFreeTrialTeacherWhatsTemplate(freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherWhatsTemplate', 'edit');
        if(isPermistted){
              this.freeTrialTeacherWhatsTemplateService.findByIdWithAssociatedList(freeTrialTeacherWhatsTemplate).subscribe(res => {
              this.selectedFreeTrialTeacherWhatsTemplate = res;

              this.editFreeTrialTeacherWhatsTemplateDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewFreeTrialTeacherWhatsTemplate(freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherWhatsTemplate', 'view');
        if(isPermistted){
           this.freeTrialTeacherWhatsTemplateService.findByIdWithAssociatedList(freeTrialTeacherWhatsTemplate).subscribe(res => {
           this.selectedFreeTrialTeacherWhatsTemplate = res;
            this.viewFreeTrialTeacherWhatsTemplateDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateFreeTrialTeacherWhatsTemplate(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedFreeTrialTeacherWhatsTemplate = new FreeTrialTeacherWhatsTemplateDto();
            this.createFreeTrialTeacherWhatsTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherWhatsTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.freeTrialTeacherWhatsTemplateService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.freeTrialTeacherWhatsTemplates.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.freeTrialTeacherWhatsTemplates.splice(index,1);
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
        return this.freeTrialTeacherWhatsTemplateSelections == null || this.freeTrialTeacherWhatsTemplateSelections.length==0
    }


    public async deleteFreeTrialTeacherWhatsTemplate(freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateDto){
       const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherWhatsTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Free trial teacher whats template) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.freeTrialTeacherWhatsTemplateService.delete(freeTrialTeacherWhatsTemplate).subscribe(status=>{
              if(status > 0){
                  const position = this.freeTrialTeacherWhatsTemplates.indexOf(freeTrialTeacherWhatsTemplate);
                  position > -1 ? this.freeTrialTeacherWhatsTemplates.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Free trial teacher whats template Supprimé',
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


    public async duplicateFreeTrialTeacherWhatsTemplate(freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateDto) {
        this.freeTrialTeacherWhatsTemplateService.findByIdWithAssociatedList(freeTrialTeacherWhatsTemplate).subscribe(
	    res => {
	       this.initDuplicateFreeTrialTeacherWhatsTemplate(res);
	       this.selectedFreeTrialTeacherWhatsTemplate = res;
	       this.selectedFreeTrialTeacherWhatsTemplate.id = null;


            this.createFreeTrialTeacherWhatsTemplateDialog = true;
        });

	}

	initDuplicateFreeTrialTeacherWhatsTemplate(res: FreeTrialTeacherWhatsTemplateDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.freeTrialTeacherWhatsTemplates.map(e => {
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

    get freeTrialTeacherWhatsTemplates() : Array<FreeTrialTeacherWhatsTemplateDto> {
           return this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates;
    }
    set freeTrialTeacherWhatsTemplates(value: Array<FreeTrialTeacherWhatsTemplateDto>) {
        this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates = value;
    }

    get freeTrialTeacherWhatsTemplateSelections() : Array<FreeTrialTeacherWhatsTemplateDto> {
           return this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplateSelections;
    }
    set freeTrialTeacherWhatsTemplateSelections(value: Array<FreeTrialTeacherWhatsTemplateDto>) {
        this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplateSelections = value;
    }

    get selectedFreeTrialTeacherWhatsTemplate() : FreeTrialTeacherWhatsTemplateDto {
           return this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate;
    }
    set selectedFreeTrialTeacherWhatsTemplate(value: FreeTrialTeacherWhatsTemplateDto) {
        this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate = value;
    }
    
    get createFreeTrialTeacherWhatsTemplateDialog() :boolean {
           return this.freeTrialTeacherWhatsTemplateService.createFreeTrialTeacherWhatsTemplateDialog;
    }
    set createFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this.freeTrialTeacherWhatsTemplateService.createFreeTrialTeacherWhatsTemplateDialog= value;
    }
    
    get editFreeTrialTeacherWhatsTemplateDialog() :boolean {
           return this.freeTrialTeacherWhatsTemplateService.editFreeTrialTeacherWhatsTemplateDialog;
    }
    set editFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this.freeTrialTeacherWhatsTemplateService.editFreeTrialTeacherWhatsTemplateDialog= value;
    }
    get viewFreeTrialTeacherWhatsTemplateDialog() :boolean {
           return this.freeTrialTeacherWhatsTemplateService.viewFreeTrialTeacherWhatsTemplateDialog;
    }
    set viewFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this.freeTrialTeacherWhatsTemplateService.viewFreeTrialTeacherWhatsTemplateDialog = value;
    }
       
     get search() : FreeTrialTeacherWhatsTemplateCriteria {
        return this.freeTrialTeacherWhatsTemplateService.search;
     }
    set search(value: FreeTrialTeacherWhatsTemplateCriteria) {
        this.freeTrialTeacherWhatsTemplateService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
