import {Component, OnInit} from '@angular/core';
import {FreeTrialStudentEmailTemplateService} from 'src/app/controller/service/FreeTrialStudentEmailTemplate.service';
import {FreeTrialStudentEmailTemplateDto} from 'src/app/controller/model/FreeTrialStudentEmailTemplate.model';
import {FreeTrialStudentEmailTemplateCriteria} from 'src/app/controller/criteria/FreeTrialStudentEmailTemplateCriteria.model';
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
  selector: 'app-free-trial-student-email-template-list-admin',
  templateUrl: './free-trial-student-email-template-list-admin.component.html'
})
export class FreeTrialStudentEmailTemplateListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FreeTrialStudentEmailTemplate';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private freeTrialStudentEmailTemplateService: FreeTrialStudentEmailTemplateService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadFreeTrialStudentEmailTemplates(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentEmailTemplate', 'list');
        isPermistted ? this.freeTrialStudentEmailTemplateService.findAll().subscribe(freeTrialStudentEmailTemplates => this.freeTrialStudentEmailTemplates = freeTrialStudentEmailTemplates,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.freeTrialStudentEmailTemplateService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.freeTrialStudentEmailTemplates = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new FreeTrialStudentEmailTemplateCriteria();
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
    
    public async editFreeTrialStudentEmailTemplate(freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentEmailTemplate', 'edit');
        if(isPermistted){
              this.freeTrialStudentEmailTemplateService.findByIdWithAssociatedList(freeTrialStudentEmailTemplate).subscribe(res => {
              this.selectedFreeTrialStudentEmailTemplate = res;

              this.editFreeTrialStudentEmailTemplateDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewFreeTrialStudentEmailTemplate(freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentEmailTemplate', 'view');
        if(isPermistted){
           this.freeTrialStudentEmailTemplateService.findByIdWithAssociatedList(freeTrialStudentEmailTemplate).subscribe(res => {
           this.selectedFreeTrialStudentEmailTemplate = res;
            this.viewFreeTrialStudentEmailTemplateDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateFreeTrialStudentEmailTemplate(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedFreeTrialStudentEmailTemplate = new FreeTrialStudentEmailTemplateDto();
            this.createFreeTrialStudentEmailTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentEmailTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.freeTrialStudentEmailTemplateService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.freeTrialStudentEmailTemplates.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.freeTrialStudentEmailTemplates.splice(index,1);
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
        return this.freeTrialStudentEmailTemplateSelections == null || this.freeTrialStudentEmailTemplateSelections.length==0
    }


    public async deleteFreeTrialStudentEmailTemplate(freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateDto){
       const isPermistted = await this.roleService.isPermitted('FreeTrialStudentEmailTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Free trial student email template) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.freeTrialStudentEmailTemplateService.delete(freeTrialStudentEmailTemplate).subscribe(status=>{
              if(status > 0){
                  const position = this.freeTrialStudentEmailTemplates.indexOf(freeTrialStudentEmailTemplate);
                  position > -1 ? this.freeTrialStudentEmailTemplates.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Free trial student email template Supprimé',
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


    public async duplicateFreeTrialStudentEmailTemplate(freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateDto) {
        this.freeTrialStudentEmailTemplateService.findByIdWithAssociatedList(freeTrialStudentEmailTemplate).subscribe(
	    res => {
	       this.initDuplicateFreeTrialStudentEmailTemplate(res);
	       this.selectedFreeTrialStudentEmailTemplate = res;
	       this.selectedFreeTrialStudentEmailTemplate.id = null;


            this.createFreeTrialStudentEmailTemplateDialog = true;
        });

	}

	initDuplicateFreeTrialStudentEmailTemplate(res: FreeTrialStudentEmailTemplateDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.freeTrialStudentEmailTemplates.map(e => {
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

    get freeTrialStudentEmailTemplates() : Array<FreeTrialStudentEmailTemplateDto> {
           return this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates;
    }
    set freeTrialStudentEmailTemplates(value: Array<FreeTrialStudentEmailTemplateDto>) {
        this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates = value;
    }

    get freeTrialStudentEmailTemplateSelections() : Array<FreeTrialStudentEmailTemplateDto> {
           return this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplateSelections;
    }
    set freeTrialStudentEmailTemplateSelections(value: Array<FreeTrialStudentEmailTemplateDto>) {
        this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplateSelections = value;
    }

    get selectedFreeTrialStudentEmailTemplate() : FreeTrialStudentEmailTemplateDto {
           return this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate;
    }
    set selectedFreeTrialStudentEmailTemplate(value: FreeTrialStudentEmailTemplateDto) {
        this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate = value;
    }
    
    get createFreeTrialStudentEmailTemplateDialog() :boolean {
           return this.freeTrialStudentEmailTemplateService.createFreeTrialStudentEmailTemplateDialog;
    }
    set createFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this.freeTrialStudentEmailTemplateService.createFreeTrialStudentEmailTemplateDialog= value;
    }
    
    get editFreeTrialStudentEmailTemplateDialog() :boolean {
           return this.freeTrialStudentEmailTemplateService.editFreeTrialStudentEmailTemplateDialog;
    }
    set editFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this.freeTrialStudentEmailTemplateService.editFreeTrialStudentEmailTemplateDialog= value;
    }
    get viewFreeTrialStudentEmailTemplateDialog() :boolean {
           return this.freeTrialStudentEmailTemplateService.viewFreeTrialStudentEmailTemplateDialog;
    }
    set viewFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this.freeTrialStudentEmailTemplateService.viewFreeTrialStudentEmailTemplateDialog = value;
    }
       
     get search() : FreeTrialStudentEmailTemplateCriteria {
        return this.freeTrialStudentEmailTemplateService.search;
     }
    set search(value: FreeTrialStudentEmailTemplateCriteria) {
        this.freeTrialStudentEmailTemplateService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
