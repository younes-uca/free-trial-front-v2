import {Component, OnInit} from '@angular/core';
import {StatutFreeTrialService} from 'src/app/controller/service/StatutFreeTrial.service';
import {StatutFreeTrialDto} from 'src/app/controller/model/StatutFreeTrial.model';
import {StatutFreeTrialCriteria} from 'src/app/controller/criteria/StatutFreeTrialCriteria.model';
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
  selector: 'app-statut-free-trial-list-admin',
  templateUrl: './statut-free-trial-list-admin.component.html'
})
export class StatutFreeTrialListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatutFreeTrial';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private statutFreeTrialService: StatutFreeTrialService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadStatutFreeTrials(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatutFreeTrial', 'list');
        isPermistted ? this.statutFreeTrialService.findAll().subscribe(statutFreeTrials => this.statutFreeTrials = statutFreeTrials,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.statutFreeTrialService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.statutFreeTrials = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new StatutFreeTrialCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'style', header: 'Style'},
        ];
    }
    
    public async editStatutFreeTrial(statutFreeTrial: StatutFreeTrialDto){
        const isPermistted = await this.roleService.isPermitted('StatutFreeTrial', 'edit');
        if(isPermistted){
              this.statutFreeTrialService.findByIdWithAssociatedList(statutFreeTrial).subscribe(res => {
              this.selectedStatutFreeTrial = res;

              this.editStatutFreeTrialDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewStatutFreeTrial(statutFreeTrial: StatutFreeTrialDto){
        const isPermistted = await this.roleService.isPermitted('StatutFreeTrial', 'view');
        if(isPermistted){
           this.statutFreeTrialService.findByIdWithAssociatedList(statutFreeTrial).subscribe(res => {
           this.selectedStatutFreeTrial = res;
            this.viewStatutFreeTrialDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateStatutFreeTrial(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedStatutFreeTrial = new StatutFreeTrialDto();
            this.createStatutFreeTrialDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('StatutFreeTrial', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.statutFreeTrialService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.statutFreeTrials.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.statutFreeTrials.splice(index,1);
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
        return this.statutFreeTrialSelections == null || this.statutFreeTrialSelections.length==0
    }


    public async deleteStatutFreeTrial(statutFreeTrial: StatutFreeTrialDto){
       const isPermistted = await this.roleService.isPermitted('StatutFreeTrial', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Statut free trial) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.statutFreeTrialService.delete(statutFreeTrial).subscribe(status=>{
              if(status > 0){
                  const position = this.statutFreeTrials.indexOf(statutFreeTrial);
                  position > -1 ? this.statutFreeTrials.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Statut free trial Supprimé',
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


    public async duplicateStatutFreeTrial(statutFreeTrial: StatutFreeTrialDto) {
        this.statutFreeTrialService.findByIdWithAssociatedList(statutFreeTrial).subscribe(
	    res => {
	       this.initDuplicateStatutFreeTrial(res);
	       this.selectedStatutFreeTrial = res;
	       this.selectedStatutFreeTrial.id = null;


            this.createStatutFreeTrialDialog = true;
        });

	}

	initDuplicateStatutFreeTrial(res: StatutFreeTrialDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.statutFreeTrials.map(e => {
            return {
                 'Libelle': e.libelle ,
                 'Code': e.code ,
                 'Style': e.style ,
            }
        });

        this.criteriaData = [{
            'Libelle': this.search.libelle ? this.search.libelle : environment.emptyForExport ,
            'Code': this.search.code ? this.search.code : environment.emptyForExport ,
            'Style': this.search.style ? this.search.style : environment.emptyForExport ,
        }];
      }

    get statutFreeTrials() : Array<StatutFreeTrialDto> {
           return this.statutFreeTrialService.statutFreeTrials;
    }
    set statutFreeTrials(value: Array<StatutFreeTrialDto>) {
        this.statutFreeTrialService.statutFreeTrials = value;
    }

    get statutFreeTrialSelections() : Array<StatutFreeTrialDto> {
           return this.statutFreeTrialService.statutFreeTrialSelections;
    }
    set statutFreeTrialSelections(value: Array<StatutFreeTrialDto>) {
        this.statutFreeTrialService.statutFreeTrialSelections = value;
    }

    get selectedStatutFreeTrial() : StatutFreeTrialDto {
           return this.statutFreeTrialService.selectedStatutFreeTrial;
    }
    set selectedStatutFreeTrial(value: StatutFreeTrialDto) {
        this.statutFreeTrialService.selectedStatutFreeTrial = value;
    }
    
    get createStatutFreeTrialDialog() :boolean {
           return this.statutFreeTrialService.createStatutFreeTrialDialog;
    }
    set createStatutFreeTrialDialog(value: boolean) {
        this.statutFreeTrialService.createStatutFreeTrialDialog= value;
    }
    
    get editStatutFreeTrialDialog() :boolean {
           return this.statutFreeTrialService.editStatutFreeTrialDialog;
    }
    set editStatutFreeTrialDialog(value: boolean) {
        this.statutFreeTrialService.editStatutFreeTrialDialog= value;
    }
    get viewStatutFreeTrialDialog() :boolean {
           return this.statutFreeTrialService.viewStatutFreeTrialDialog;
    }
    set viewStatutFreeTrialDialog(value: boolean) {
        this.statutFreeTrialService.viewStatutFreeTrialDialog = value;
    }
       
     get search() : StatutFreeTrialCriteria {
        return this.statutFreeTrialService.search;
     }
    set search(value: StatutFreeTrialCriteria) {
        this.statutFreeTrialService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
