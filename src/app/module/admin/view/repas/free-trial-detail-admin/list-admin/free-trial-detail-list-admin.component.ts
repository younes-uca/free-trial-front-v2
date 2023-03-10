import {Component, OnInit} from '@angular/core';
import {FreeTrialDetailService} from 'src/app/controller/service/FreeTrialDetail.service';
import {FreeTrialDetailDto} from 'src/app/controller/model/FreeTrialDetail.model';
import {FreeTrialDetailCriteria} from 'src/app/controller/criteria/FreeTrialDetailCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';



import { FreeTrialService } from 'src/app/controller/service/FreeTrial.service';
import { StudentService } from 'src/app/controller/service/Student.service';

import {FreeTrialDto} from 'src/app/controller/model/FreeTrial.model';
import {StudentDto} from 'src/app/controller/model/Student.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-free-trial-detail-list-admin',
  templateUrl: './free-trial-detail-list-admin.component.html'
})
export class FreeTrialDetailListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FreeTrialDetail';

     yesOrNoPresence :any[] =[];
     yesOrNoWhatsUpMessageSent :any[] =[];
     yesOrNoEmailMessageSent :any[] =[];
     yesOrNoAbonne :any[] =[];
    freeTrials :Array<FreeTrialDto>;
    students :Array<StudentDto>;
    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private freeTrialDetailService: FreeTrialDetailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private freeTrialService: FreeTrialService
        , private studentService: StudentService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
      this.loadFreeTrial();
      this.loadStudent();
    this.yesOrNoPresence =  [{label: 'Presence', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoWhatsUpMessageSent =  [{label: 'WhatsUpMessageSent', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEmailMessageSent =  [{label: 'EmailMessageSent', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAbonne =  [{label: 'Abonne', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }

    public async loadFreeTrialDetails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FreeTrialDetail', 'list');
        isPermistted ? this.freeTrialDetailService.findAll().subscribe(freeTrialDetails => this.freeTrialDetails = freeTrialDetails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.freeTrialDetailService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.freeTrialDetails = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new FreeTrialDetailCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'freeTrial?.id', header: 'Free trial'},
            {field: 'student?.libelle', header: 'Student'},
            {field: 'presence', header: 'Presence'},
            {field: 'whatsUpMessageSent', header: 'Whats up message sent'},
            {field: 'dateEnvoiwhatsUpMessage', header: 'Date envoiwhats up message'},
            {field: 'emailMessageSent', header: 'Email message sent'},
            {field: 'dateEnvoiEmailMessage', header: 'Date envoi email message'},
            {field: 'abonne', header: 'Abonne'},
        ];
    }
    
    public async editFreeTrialDetail(freeTrialDetail: FreeTrialDetailDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialDetail', 'edit');
        if(isPermistted){
              this.freeTrialDetailService.findByIdWithAssociatedList(freeTrialDetail).subscribe(res => {
              this.selectedFreeTrialDetail = res;
              this.selectedFreeTrialDetail.dateEnvoiwhatsUpMessage = new Date(freeTrialDetail.dateEnvoiwhatsUpMessage);
              this.selectedFreeTrialDetail.dateEnvoiEmailMessage = new Date(freeTrialDetail.dateEnvoiEmailMessage);

              this.editFreeTrialDetailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewFreeTrialDetail(freeTrialDetail: FreeTrialDetailDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrialDetail', 'view');
        if(isPermistted){
           this.freeTrialDetailService.findByIdWithAssociatedList(freeTrialDetail).subscribe(res => {
           this.selectedFreeTrialDetail = res;
           this.selectedFreeTrialDetail.dateEnvoiwhatsUpMessage = new Date(freeTrialDetail.dateEnvoiwhatsUpMessage);
           this.selectedFreeTrialDetail.dateEnvoiEmailMessage = new Date(freeTrialDetail.dateEnvoiEmailMessage);
            this.viewFreeTrialDetailDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateFreeTrialDetail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedFreeTrialDetail = new FreeTrialDetailDto();
            this.createFreeTrialDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('FreeTrialDetail', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.freeTrialDetailService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.freeTrialDetails.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.freeTrialDetails.splice(index,1);
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
        return this.freeTrialDetailSelections == null || this.freeTrialDetailSelections.length==0
    }


    public async deleteFreeTrialDetail(freeTrialDetail: FreeTrialDetailDto){
       const isPermistted = await this.roleService.isPermitted('FreeTrialDetail', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Free trial detail) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.freeTrialDetailService.delete(freeTrialDetail).subscribe(status=>{
              if(status > 0){
                  const position = this.freeTrialDetails.indexOf(freeTrialDetail);
                  position > -1 ? this.freeTrialDetails.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Free trial detail Supprimé',
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

public async loadFreeTrial(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrialDetail', 'list');
    isPermistted ? this.freeTrialService.findAll().subscribe(freeTrials => this.freeTrials = freeTrials,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadStudent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrialDetail', 'list');
    isPermistted ? this.studentService.findAll().subscribe(students => this.students = students,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

    public async duplicateFreeTrialDetail(freeTrialDetail: FreeTrialDetailDto) {
        this.freeTrialDetailService.findByIdWithAssociatedList(freeTrialDetail).subscribe(
	    res => {
	       this.initDuplicateFreeTrialDetail(res);
	       this.selectedFreeTrialDetail = res;
	       this.selectedFreeTrialDetail.id = null;


            this.createFreeTrialDetailDialog = true;
        });

	}

	initDuplicateFreeTrialDetail(res: FreeTrialDetailDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.freeTrialDetails.map(e => {
            return {
                'Free trial': e.freeTrial?.id ,
                'Student': e.student?.libelle ,
                'Presence': e.presence? 'Vrai' : 'Faux' ,
                'Whats up message sent': e.whatsUpMessageSent? 'Vrai' : 'Faux' ,
                'Date envoiwhats up message': this.datePipe.transform(e.dateEnvoiwhatsUpMessage , 'dd/MM/yyyy hh:mm'),
                'Email message sent': e.emailMessageSent? 'Vrai' : 'Faux' ,
                'Date envoi email message': this.datePipe.transform(e.dateEnvoiEmailMessage , 'dd/MM/yyyy hh:mm'),
                'Abonne': e.abonne? 'Vrai' : 'Faux' ,
            }
        });

        this.criteriaData = [{
        //'Free trial': this.search.freeTrial?.id ? this.search.freeTrial?.id : environment.emptyForExport ,
        //'Student': this.search.student?.libelle ? this.search.student?.libelle : environment.emptyForExport ,
            'Presence': this.search.presence ? (this.search.presence ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Whats up message sent': this.search.whatsUpMessageSent ? (this.search.whatsUpMessageSent ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoiwhats up message Min': this.search.dateEnvoiwhatsUpMessageFrom ? this.datePipe.transform(this.search.dateEnvoiwhatsUpMessageFrom , this.dateFormat) : environment.emptyForExport ,
            'Date envoiwhats up message Max': this.search.dateEnvoiwhatsUpMessageTo ? this.datePipe.transform(this.search.dateEnvoiwhatsUpMessageTo , this.dateFormat) : environment.emptyForExport ,
            'Email message sent': this.search.emailMessageSent ? (this.search.emailMessageSent ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoi email message Min': this.search.dateEnvoiEmailMessageFrom ? this.datePipe.transform(this.search.dateEnvoiEmailMessageFrom , this.dateFormat) : environment.emptyForExport ,
            'Date envoi email message Max': this.search.dateEnvoiEmailMessageTo ? this.datePipe.transform(this.search.dateEnvoiEmailMessageTo , this.dateFormat) : environment.emptyForExport ,
            'Abonne': this.search.abonne ? (this.search.abonne ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
        }];
      }

    get freeTrialDetails() : Array<FreeTrialDetailDto> {
           return this.freeTrialDetailService.freeTrialDetails;
    }
    set freeTrialDetails(value: Array<FreeTrialDetailDto>) {
        this.freeTrialDetailService.freeTrialDetails = value;
    }

    get freeTrialDetailSelections() : Array<FreeTrialDetailDto> {
           return this.freeTrialDetailService.freeTrialDetailSelections;
    }
    set freeTrialDetailSelections(value: Array<FreeTrialDetailDto>) {
        this.freeTrialDetailService.freeTrialDetailSelections = value;
    }

    get selectedFreeTrialDetail() : FreeTrialDetailDto {
           return this.freeTrialDetailService.selectedFreeTrialDetail;
    }
    set selectedFreeTrialDetail(value: FreeTrialDetailDto) {
        this.freeTrialDetailService.selectedFreeTrialDetail = value;
    }
    
    get createFreeTrialDetailDialog() :boolean {
           return this.freeTrialDetailService.createFreeTrialDetailDialog;
    }
    set createFreeTrialDetailDialog(value: boolean) {
        this.freeTrialDetailService.createFreeTrialDetailDialog= value;
    }
    
    get editFreeTrialDetailDialog() :boolean {
           return this.freeTrialDetailService.editFreeTrialDetailDialog;
    }
    set editFreeTrialDetailDialog(value: boolean) {
        this.freeTrialDetailService.editFreeTrialDetailDialog= value;
    }
    get viewFreeTrialDetailDialog() :boolean {
           return this.freeTrialDetailService.viewFreeTrialDetailDialog;
    }
    set viewFreeTrialDetailDialog(value: boolean) {
        this.freeTrialDetailService.viewFreeTrialDetailDialog = value;
    }
       
     get search() : FreeTrialDetailCriteria {
        return this.freeTrialDetailService.search;
     }
    set search(value: FreeTrialDetailCriteria) {
        this.freeTrialDetailService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
