import {Component, OnInit} from '@angular/core';
import {FreeTrialConfigurationService} from 'src/app/controller/service/FreeTrialConfiguration.service';
import {FreeTrialConfigurationDto} from 'src/app/controller/model/FreeTrialConfiguration.model';
import {FreeTrialConfigurationCriteria} from 'src/app/controller/criteria/FreeTrialConfigurationCriteria.model';
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
  selector: 'app-free-trial-configuration-list-admin',
  templateUrl: './free-trial-configuration-list-admin.component.html'
})
export class FreeTrialConfigurationListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FreeTrialConfiguration';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private freeTrialConfigurationService: FreeTrialConfigurationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadFreeTrialConfigurations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FreeTrialConfiguration', 'list');
        isPermistted ? this.freeTrialConfigurationService.findAll().subscribe(freeTrialConfigurations => this.freeTrialConfigurations = freeTrialConfigurations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.freeTrialConfigurationService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.freeTrialConfigurations = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new FreeTrialConfigurationCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'dateApplicationDebut', header: 'Date application debut'},
            {field: 'dateApplicationFin', header: 'Date application fin'},
            {field: 'nombreStudentMax', header: 'Nombre student max'},
            {field: 'nombreStudentMin', header: 'Nombre student min'},
        ];
    }
    
    public async editFreeTrialConfiguration(freeTrialConfiguration: FreeTrialConfigurationDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialConfiguration', 'edit');
        if(isPermistted){
              this.freeTrialConfigurationService.findByIdWithAssociatedList(freeTrialConfiguration).subscribe(res => {
              this.selectedFreeTrialConfiguration = res;
              this.selectedFreeTrialConfiguration.dateApplicationDebut = new Date(freeTrialConfiguration.dateApplicationDebut);
              this.selectedFreeTrialConfiguration.dateApplicationFin = new Date(freeTrialConfiguration.dateApplicationFin);

              this.editFreeTrialConfigurationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewFreeTrialConfiguration(freeTrialConfiguration: FreeTrialConfigurationDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialConfiguration', 'view');
        if(isPermistted){
           this.freeTrialConfigurationService.findByIdWithAssociatedList(freeTrialConfiguration).subscribe(res => {
           this.selectedFreeTrialConfiguration = res;
           this.selectedFreeTrialConfiguration.dateApplicationDebut = new Date(freeTrialConfiguration.dateApplicationDebut);
           this.selectedFreeTrialConfiguration.dateApplicationFin = new Date(freeTrialConfiguration.dateApplicationFin);
            this.viewFreeTrialConfigurationDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateFreeTrialConfiguration(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedFreeTrialConfiguration = new FreeTrialConfigurationDto();
            this.createFreeTrialConfigurationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('FreeTrialConfiguration', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.freeTrialConfigurationService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.freeTrialConfigurations.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.freeTrialConfigurations.splice(index,1);
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
        return this.freeTrialConfigurationSelections == null || this.freeTrialConfigurationSelections.length==0
    }


    public async deleteFreeTrialConfiguration(freeTrialConfiguration: FreeTrialConfigurationDto){
       const isPermistted = await this.roleService.isPermitted('FreeTrialConfiguration', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Free trial configuration) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.freeTrialConfigurationService.delete(freeTrialConfiguration).subscribe(status=>{
              if(status > 0){
                  const position = this.freeTrialConfigurations.indexOf(freeTrialConfiguration);
                  position > -1 ? this.freeTrialConfigurations.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Free trial configuration Supprimé',
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


    public async duplicateFreeTrialConfiguration(freeTrialConfiguration: FreeTrialConfigurationDto) {
        this.freeTrialConfigurationService.findByIdWithAssociatedList(freeTrialConfiguration).subscribe(
	    res => {
	       this.initDuplicateFreeTrialConfiguration(res);
	       this.selectedFreeTrialConfiguration = res;
	       this.selectedFreeTrialConfiguration.id = null;


            this.createFreeTrialConfigurationDialog = true;
        });

	}

	initDuplicateFreeTrialConfiguration(res: FreeTrialConfigurationDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.freeTrialConfigurations.map(e => {
            return {
                'Date application debut': this.datePipe.transform(e.dateApplicationDebut , 'dd/MM/yyyy hh:mm'),
                'Date application fin': this.datePipe.transform(e.dateApplicationFin , 'dd/MM/yyyy hh:mm'),
                 'Nombre student max': e.nombreStudentMax ,
                 'Nombre student min': e.nombreStudentMin ,
            }
        });

        this.criteriaData = [{
            'Date application debut Min': this.search.dateApplicationDebutFrom ? this.datePipe.transform(this.search.dateApplicationDebutFrom , this.dateFormat) : environment.emptyForExport ,
            'Date application debut Max': this.search.dateApplicationDebutTo ? this.datePipe.transform(this.search.dateApplicationDebutTo , this.dateFormat) : environment.emptyForExport ,
            'Date application fin Min': this.search.dateApplicationFinFrom ? this.datePipe.transform(this.search.dateApplicationFinFrom , this.dateFormat) : environment.emptyForExport ,
            'Date application fin Max': this.search.dateApplicationFinTo ? this.datePipe.transform(this.search.dateApplicationFinTo , this.dateFormat) : environment.emptyForExport ,
            'Nombre student max Min': this.search.nombreStudentMaxMin ? this.search.nombreStudentMaxMin : environment.emptyForExport ,
            'Nombre student max Max': this.search.nombreStudentMaxMax ? this.search.nombreStudentMaxMax : environment.emptyForExport ,
            'Nombre student min Min': this.search.nombreStudentMinMin ? this.search.nombreStudentMinMin : environment.emptyForExport ,
            'Nombre student min Max': this.search.nombreStudentMinMax ? this.search.nombreStudentMinMax : environment.emptyForExport ,
        }];
      }

    get freeTrialConfigurations() : Array<FreeTrialConfigurationDto> {
           return this.freeTrialConfigurationService.freeTrialConfigurations;
    }
    set freeTrialConfigurations(value: Array<FreeTrialConfigurationDto>) {
        this.freeTrialConfigurationService.freeTrialConfigurations = value;
    }

    get freeTrialConfigurationSelections() : Array<FreeTrialConfigurationDto> {
           return this.freeTrialConfigurationService.freeTrialConfigurationSelections;
    }
    set freeTrialConfigurationSelections(value: Array<FreeTrialConfigurationDto>) {
        this.freeTrialConfigurationService.freeTrialConfigurationSelections = value;
    }

    get selectedFreeTrialConfiguration() : FreeTrialConfigurationDto {
           return this.freeTrialConfigurationService.selectedFreeTrialConfiguration;
    }
    set selectedFreeTrialConfiguration(value: FreeTrialConfigurationDto) {
        this.freeTrialConfigurationService.selectedFreeTrialConfiguration = value;
    }
    
    get createFreeTrialConfigurationDialog() :boolean {
           return this.freeTrialConfigurationService.createFreeTrialConfigurationDialog;
    }
    set createFreeTrialConfigurationDialog(value: boolean) {
        this.freeTrialConfigurationService.createFreeTrialConfigurationDialog= value;
    }
    
    get editFreeTrialConfigurationDialog() :boolean {
           return this.freeTrialConfigurationService.editFreeTrialConfigurationDialog;
    }
    set editFreeTrialConfigurationDialog(value: boolean) {
        this.freeTrialConfigurationService.editFreeTrialConfigurationDialog= value;
    }
    get viewFreeTrialConfigurationDialog() :boolean {
           return this.freeTrialConfigurationService.viewFreeTrialConfigurationDialog;
    }
    set viewFreeTrialConfigurationDialog(value: boolean) {
        this.freeTrialConfigurationService.viewFreeTrialConfigurationDialog = value;
    }
       
     get search() : FreeTrialConfigurationCriteria {
        return this.freeTrialConfigurationService.search;
     }
    set search(value: FreeTrialConfigurationCriteria) {
        this.freeTrialConfigurationService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
