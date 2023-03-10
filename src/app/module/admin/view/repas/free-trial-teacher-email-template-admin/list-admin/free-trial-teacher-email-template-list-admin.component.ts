import {Component, OnInit} from '@angular/core';
import {FreeTrialTeacherEmailTemplateService} from 'src/app/controller/service/FreeTrialTeacherEmailTemplate.service';
import {FreeTrialTeacherEmailTemplateDto} from 'src/app/controller/model/FreeTrialTeacherEmailTemplate.model';
import {FreeTrialTeacherEmailTemplateCriteria} from 'src/app/controller/criteria/FreeTrialTeacherEmailTemplateCriteria.model';
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
  selector: 'app-free-trial-teacher-email-template-list-admin',
  templateUrl: './free-trial-teacher-email-template-list-admin.component.html'
})
export class FreeTrialTeacherEmailTemplateListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FreeTrialTeacherEmailTemplate';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private freeTrialTeacherEmailTemplateService: FreeTrialTeacherEmailTemplateService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadFreeTrialTeacherEmailTemplates(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherEmailTemplate', 'list');
        isPermistted ? this.freeTrialTeacherEmailTemplateService.findAll().subscribe(freeTrialTeacherEmailTemplates => this.freeTrialTeacherEmailTemplates = freeTrialTeacherEmailTemplates,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.freeTrialTeacherEmailTemplateService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.freeTrialTeacherEmailTemplates = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new FreeTrialTeacherEmailTemplateCriteria();
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
    
    public async editFreeTrialTeacherEmailTemplate(freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherEmailTemplate', 'edit');
        if(isPermistted){
              this.freeTrialTeacherEmailTemplateService.findByIdWithAssociatedList(freeTrialTeacherEmailTemplate).subscribe(res => {
              this.selectedFreeTrialTeacherEmailTemplate = res;

              this.editFreeTrialTeacherEmailTemplateDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewFreeTrialTeacherEmailTemplate(freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherEmailTemplate', 'view');
        if(isPermistted){
           this.freeTrialTeacherEmailTemplateService.findByIdWithAssociatedList(freeTrialTeacherEmailTemplate).subscribe(res => {
           this.selectedFreeTrialTeacherEmailTemplate = res;
            this.viewFreeTrialTeacherEmailTemplateDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateFreeTrialTeacherEmailTemplate(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedFreeTrialTeacherEmailTemplate = new FreeTrialTeacherEmailTemplateDto();
            this.createFreeTrialTeacherEmailTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherEmailTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.freeTrialTeacherEmailTemplateService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.freeTrialTeacherEmailTemplates.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.freeTrialTeacherEmailTemplates.splice(index,1);
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
        return this.freeTrialTeacherEmailTemplateSelections == null || this.freeTrialTeacherEmailTemplateSelections.length==0
    }


    public async deleteFreeTrialTeacherEmailTemplate(freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateDto){
       const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherEmailTemplate', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Free trial teacher email template) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.freeTrialTeacherEmailTemplateService.delete(freeTrialTeacherEmailTemplate).subscribe(status=>{
              if(status > 0){
                  const position = this.freeTrialTeacherEmailTemplates.indexOf(freeTrialTeacherEmailTemplate);
                  position > -1 ? this.freeTrialTeacherEmailTemplates.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Free trial teacher email template Supprimé',
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


    public async duplicateFreeTrialTeacherEmailTemplate(freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateDto) {
        this.freeTrialTeacherEmailTemplateService.findByIdWithAssociatedList(freeTrialTeacherEmailTemplate).subscribe(
	    res => {
	       this.initDuplicateFreeTrialTeacherEmailTemplate(res);
	       this.selectedFreeTrialTeacherEmailTemplate = res;
	       this.selectedFreeTrialTeacherEmailTemplate.id = null;


            this.createFreeTrialTeacherEmailTemplateDialog = true;
        });

	}

	initDuplicateFreeTrialTeacherEmailTemplate(res: FreeTrialTeacherEmailTemplateDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.freeTrialTeacherEmailTemplates.map(e => {
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

    get freeTrialTeacherEmailTemplates() : Array<FreeTrialTeacherEmailTemplateDto> {
           return this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates;
    }
    set freeTrialTeacherEmailTemplates(value: Array<FreeTrialTeacherEmailTemplateDto>) {
        this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates = value;
    }

    get freeTrialTeacherEmailTemplateSelections() : Array<FreeTrialTeacherEmailTemplateDto> {
           return this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplateSelections;
    }
    set freeTrialTeacherEmailTemplateSelections(value: Array<FreeTrialTeacherEmailTemplateDto>) {
        this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplateSelections = value;
    }

    get selectedFreeTrialTeacherEmailTemplate() : FreeTrialTeacherEmailTemplateDto {
           return this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate;
    }
    set selectedFreeTrialTeacherEmailTemplate(value: FreeTrialTeacherEmailTemplateDto) {
        this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate = value;
    }
    
    get createFreeTrialTeacherEmailTemplateDialog() :boolean {
           return this.freeTrialTeacherEmailTemplateService.createFreeTrialTeacherEmailTemplateDialog;
    }
    set createFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this.freeTrialTeacherEmailTemplateService.createFreeTrialTeacherEmailTemplateDialog= value;
    }
    
    get editFreeTrialTeacherEmailTemplateDialog() :boolean {
           return this.freeTrialTeacherEmailTemplateService.editFreeTrialTeacherEmailTemplateDialog;
    }
    set editFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this.freeTrialTeacherEmailTemplateService.editFreeTrialTeacherEmailTemplateDialog= value;
    }
    get viewFreeTrialTeacherEmailTemplateDialog() :boolean {
           return this.freeTrialTeacherEmailTemplateService.viewFreeTrialTeacherEmailTemplateDialog;
    }
    set viewFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this.freeTrialTeacherEmailTemplateService.viewFreeTrialTeacherEmailTemplateDialog = value;
    }
       
     get search() : FreeTrialTeacherEmailTemplateCriteria {
        return this.freeTrialTeacherEmailTemplateService.search;
     }
    set search(value: FreeTrialTeacherEmailTemplateCriteria) {
        this.freeTrialTeacherEmailTemplateService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
