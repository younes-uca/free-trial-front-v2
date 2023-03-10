import {Component, OnInit} from '@angular/core';
import {ServicesService} from 'src/app/controller/service/Services.service';
import {ServicesDto} from 'src/app/controller/model/Services.model';
import {ServicesCriteria} from 'src/app/controller/criteria/ServicesCriteria.model';
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
  selector: 'app-services-list-admin',
  templateUrl: './services-list-admin.component.html'
})
export class ServicesListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Services';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private servicesService: ServicesService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadServicess(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Services', 'list');
        isPermistted ? this.servicesService.findAll().subscribe(servicess => this.servicess = servicess,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.servicesService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.servicess = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new ServicesCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'code', header: 'Code'},
            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editServices(services: ServicesDto){
        const isPermistted = await this.roleService.isPermitted('Services', 'edit');
        if(isPermistted){
              this.servicesService.findByIdWithAssociatedList(services).subscribe(res => {
              this.selectedServices = res;

              this.editServicesDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewServices(services: ServicesDto){
        const isPermistted = await this.roleService.isPermitted('Services', 'view');
        if(isPermistted){
           this.servicesService.findByIdWithAssociatedList(services).subscribe(res => {
           this.selectedServices = res;
            this.viewServicesDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateServices(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedServices = new ServicesDto();
            this.createServicesDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Services', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.servicesService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.servicess.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.servicess.splice(index,1);
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
        return this.servicesSelections == null || this.servicesSelections.length==0
    }


    public async deleteServices(services: ServicesDto){
       const isPermistted = await this.roleService.isPermitted('Services', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Services) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.servicesService.delete(services).subscribe(status=>{
              if(status > 0){
                  const position = this.servicess.indexOf(services);
                  position > -1 ? this.servicess.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Services Supprimé',
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


    public async duplicateServices(services: ServicesDto) {
        this.servicesService.findByIdWithAssociatedList(services).subscribe(
	    res => {
	       this.initDuplicateServices(res);
	       this.selectedServices = res;
	       this.selectedServices.id = null;


            this.createServicesDialog = true;
        });

	}

	initDuplicateServices(res: ServicesDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.servicess.map(e => {
            return {
                 'Code': e.code ,
                 'Libelle': e.libelle ,
                 'Description': e.description ,
            }
        });

        this.criteriaData = [{
            'Code': this.search.code ? this.search.code : environment.emptyForExport ,
            'Libelle': this.search.libelle ? this.search.libelle : environment.emptyForExport ,
            'Description': this.search.description ? this.search.description : environment.emptyForExport ,
        }];
      }

    get servicess() : Array<ServicesDto> {
           return this.servicesService.servicess;
    }
    set servicess(value: Array<ServicesDto>) {
        this.servicesService.servicess = value;
    }

    get servicesSelections() : Array<ServicesDto> {
           return this.servicesService.servicesSelections;
    }
    set servicesSelections(value: Array<ServicesDto>) {
        this.servicesService.servicesSelections = value;
    }

    get selectedServices() : ServicesDto {
           return this.servicesService.selectedServices;
    }
    set selectedServices(value: ServicesDto) {
        this.servicesService.selectedServices = value;
    }
    
    get createServicesDialog() :boolean {
           return this.servicesService.createServicesDialog;
    }
    set createServicesDialog(value: boolean) {
        this.servicesService.createServicesDialog= value;
    }
    
    get editServicesDialog() :boolean {
           return this.servicesService.editServicesDialog;
    }
    set editServicesDialog(value: boolean) {
        this.servicesService.editServicesDialog= value;
    }
    get viewServicesDialog() :boolean {
           return this.servicesService.viewServicesDialog;
    }
    set viewServicesDialog(value: boolean) {
        this.servicesService.viewServicesDialog = value;
    }
       
     get search() : ServicesCriteria {
        return this.servicesService.search;
     }
    set search(value: ServicesCriteria) {
        this.servicesService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
