import {Component, OnInit} from '@angular/core';
import {FreeTrialService} from 'src/app/controller/service/FreeTrial.service';
import {FreeTrialDto} from 'src/app/controller/model/FreeTrial.model';
import {FreeTrialCriteria} from 'src/app/controller/criteria/FreeTrialCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';



import { TeacherService } from 'src/app/controller/service/Teacher.service';
import { LevelService } from 'src/app/controller/service/Level.service';
import { FreeTrialStudentWhatsTemplateService } from 'src/app/controller/service/FreeTrialStudentWhatsTemplate.service';
import { FreeTrialStudentEmailTemplateService } from 'src/app/controller/service/FreeTrialStudentEmailTemplate.service';
import { FreeTrialTeacherEmailTemplateService } from 'src/app/controller/service/FreeTrialTeacherEmailTemplate.service';
import { FreeTrialTeacherWhatsTemplateService } from 'src/app/controller/service/FreeTrialTeacherWhatsTemplate.service';
import { FreeTrialConfigurationService } from 'src/app/controller/service/FreeTrialConfiguration.service';
import { StatutFreeTrialService } from 'src/app/controller/service/StatutFreeTrial.service';

import {FreeTrialTeacherEmailTemplateDto} from 'src/app/controller/model/FreeTrialTeacherEmailTemplate.model';
import {FreeTrialTeacherWhatsTemplateDto} from 'src/app/controller/model/FreeTrialTeacherWhatsTemplate.model';
import {StatutFreeTrialDto} from 'src/app/controller/model/StatutFreeTrial.model';
import {FreeTrialConfigurationDto} from 'src/app/controller/model/FreeTrialConfiguration.model';
import {FreeTrialStudentEmailTemplateDto} from 'src/app/controller/model/FreeTrialStudentEmailTemplate.model';
import {FreeTrialDetailDto} from 'src/app/controller/model/FreeTrialDetail.model';
import {TeacherDto} from 'src/app/controller/model/Teacher.model';
import {LevelDto} from 'src/app/controller/model/Level.model';
import {FreeTrialStudentWhatsTemplateDto} from 'src/app/controller/model/FreeTrialStudentWhatsTemplate.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-free-trial-list-admin',
  templateUrl: './free-trial-list-admin.component.html'
})
export class FreeTrialListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FreeTrial';

    teachers :Array<TeacherDto>;
    levels :Array<LevelDto>;
    freeTrialStudentWhatsTemplates :Array<FreeTrialStudentWhatsTemplateDto>;
    freeTrialStudentEmailTemplates :Array<FreeTrialStudentEmailTemplateDto>;
    freeTrialTeacherEmailTemplates :Array<FreeTrialTeacherEmailTemplateDto>;
    freeTrialTeacherWhatsTemplates :Array<FreeTrialTeacherWhatsTemplateDto>;
    freeTrialConfigurations :Array<FreeTrialConfigurationDto>;
    statutFreeTrials :Array<StatutFreeTrialDto>;
    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private freeTrialService: FreeTrialService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private teacherService: TeacherService
        , private levelService: LevelService
        , private freeTrialStudentWhatsTemplateService: FreeTrialStudentWhatsTemplateService
        , private freeTrialStudentEmailTemplateService: FreeTrialStudentEmailTemplateService
        , private freeTrialTeacherEmailTemplateService: FreeTrialTeacherEmailTemplateService
        , private freeTrialTeacherWhatsTemplateService: FreeTrialTeacherWhatsTemplateService
        , private freeTrialConfigurationService: FreeTrialConfigurationService
        , private statutFreeTrialService: StatutFreeTrialService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
      this.loadTeacher();
      this.loadLevel();
      this.loadFreeTrialStudentWhatsTemplate();
      this.loadFreeTrialStudentEmailTemplate();
      this.loadFreeTrialTeacherEmailTemplate();
      this.loadFreeTrialTeacherWhatsTemplate();
      this.loadFreeTrialConfiguration();
      this.loadStatutFreeTrial();
    }

    public async loadFreeTrials(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
        isPermistted ? this.freeTrialService.findAll().subscribe(freeTrials => this.freeTrials = freeTrials,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.freeTrialService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.freeTrials = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new FreeTrialCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'teacher?.libelle', header: 'Teacher'},
            {field: 'level?.libelle', header: 'Level'},
            {field: 'dateFreeTrial', header: 'Date free trial'},
            {field: 'link', header: 'Link'},
            {field: 'freeTrialStudentWhatsTemplate?.id', header: 'Free trial student whats template'},
            {field: 'freeTrialStudentEmailTemplate?.id', header: 'Free trial student email template'},
            {field: 'freeTrialTeacherEmailTemplate?.id', header: 'Free trial teacher email template'},
            {field: 'freeTrialTeacherWhatsTemplate?.id', header: 'Free trial teacher whats template'},
            {field: 'dateFreeTrialPremierRappel', header: 'Date free trial premier rappel'},
            {field: 'dateFreeTrialPremierDeuxiemeRappel', header: 'Date free trial premier deuxieme rappel'},
            {field: 'nombreStudentTotal', header: 'Nombre student total'},
            {field: 'freeTrialConfiguration?.id', header: 'Free trial configuration'},
            {field: 'nombreStudentAbonne', header: 'Nombre student abonne'},
            {field: 'nombreStudentPresent', header: 'Nombre student present'},
            {field: 'statutFreeTrial?.libelle', header: 'Statut free trial'},
        ];
    }
    
    public async editFreeTrial(freeTrial: FreeTrialDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrial', 'edit');
        if(isPermistted){
              this.freeTrialService.findByIdWithAssociatedList(freeTrial).subscribe(res => {
              this.selectedFreeTrial = res;
              this.selectedFreeTrial.dateFreeTrial = new Date(freeTrial.dateFreeTrial);
              this.selectedFreeTrial.dateFreeTrialPremierRappel = new Date(freeTrial.dateFreeTrialPremierRappel);
              this.selectedFreeTrial.dateFreeTrialPremierDeuxiemeRappel = new Date(freeTrial.dateFreeTrialPremierDeuxiemeRappel);

              this.editFreeTrialDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewFreeTrial(freeTrial: FreeTrialDto){
        const isPermistted = await this.roleService.isPermitted('FreeTrial', 'view');
        if(isPermistted){
           this.freeTrialService.findByIdWithAssociatedList(freeTrial).subscribe(res => {
           this.selectedFreeTrial = res;
           this.selectedFreeTrial.dateFreeTrial = new Date(freeTrial.dateFreeTrial);
           this.selectedFreeTrial.dateFreeTrialPremierRappel = new Date(freeTrial.dateFreeTrialPremierRappel);
           this.selectedFreeTrial.dateFreeTrialPremierDeuxiemeRappel = new Date(freeTrial.dateFreeTrialPremierDeuxiemeRappel);
            this.viewFreeTrialDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateFreeTrial(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedFreeTrial = new FreeTrialDto();
            this.createFreeTrialDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('FreeTrial', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.freeTrialService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.freeTrials.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.freeTrials.splice(index,1);
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
        return this.freeTrialSelections == null || this.freeTrialSelections.length==0
    }


    public async deleteFreeTrial(freeTrial: FreeTrialDto){
       const isPermistted = await this.roleService.isPermitted('FreeTrial', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Free trial) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.freeTrialService.delete(freeTrial).subscribe(status=>{
              if(status > 0){
                  const position = this.freeTrials.indexOf(freeTrial);
                  position > -1 ? this.freeTrials.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Free trial Supprimé',
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

public async loadTeacher(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.teacherService.findAll().subscribe(teachers => this.teachers = teachers,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadLevel(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.levelService.findAll().subscribe(levels => this.levels = levels,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFreeTrialStudentWhatsTemplate(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.freeTrialStudentWhatsTemplateService.findAll().subscribe(freeTrialStudentWhatsTemplates => this.freeTrialStudentWhatsTemplates = freeTrialStudentWhatsTemplates,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFreeTrialStudentEmailTemplate(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.freeTrialStudentEmailTemplateService.findAll().subscribe(freeTrialStudentEmailTemplates => this.freeTrialStudentEmailTemplates = freeTrialStudentEmailTemplates,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFreeTrialTeacherEmailTemplate(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.freeTrialTeacherEmailTemplateService.findAll().subscribe(freeTrialTeacherEmailTemplates => this.freeTrialTeacherEmailTemplates = freeTrialTeacherEmailTemplates,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFreeTrialTeacherWhatsTemplate(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.freeTrialTeacherWhatsTemplateService.findAll().subscribe(freeTrialTeacherWhatsTemplates => this.freeTrialTeacherWhatsTemplates = freeTrialTeacherWhatsTemplates,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFreeTrialConfiguration(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.freeTrialConfigurationService.findAll().subscribe(freeTrialConfigurations => this.freeTrialConfigurations = freeTrialConfigurations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadStatutFreeTrial(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FreeTrial', 'list');
    isPermistted ? this.statutFreeTrialService.findAll().subscribe(statutFreeTrials => this.statutFreeTrials = statutFreeTrials,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

    public async duplicateFreeTrial(freeTrial: FreeTrialDto) {
        this.freeTrialService.findByIdWithAssociatedList(freeTrial).subscribe(
	    res => {
	       this.initDuplicateFreeTrial(res);
	       this.selectedFreeTrial = res;
	       this.selectedFreeTrial.id = null;


            this.createFreeTrialDialog = true;
        });

	}

	initDuplicateFreeTrial(res: FreeTrialDto) {
        if (res.freeTrialDetails != null) {
             res.freeTrialDetails.forEach(d => { d.freeTrial = null; d.id = null; });
        }
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.freeTrials.map(e => {
            return {
                'Teacher': e.teacher?.libelle ,
                'Level': e.level?.libelle ,
                'Date free trial': this.datePipe.transform(e.dateFreeTrial , 'dd/MM/yyyy hh:mm'),
                 'Link': e.link ,
                'Free trial student whats template': e.freeTrialStudentWhatsTemplate?.id ,
                'Free trial student email template': e.freeTrialStudentEmailTemplate?.id ,
                'Free trial teacher email template': e.freeTrialTeacherEmailTemplate?.id ,
                'Free trial teacher whats template': e.freeTrialTeacherWhatsTemplate?.id ,
                'Date free trial premier rappel': this.datePipe.transform(e.dateFreeTrialPremierRappel , 'dd/MM/yyyy hh:mm'),
                'Date free trial premier deuxieme rappel': this.datePipe.transform(e.dateFreeTrialPremierDeuxiemeRappel , 'dd/MM/yyyy hh:mm'),
                 'Nombre student total': e.nombreStudentTotal ,
                'Free trial configuration': e.freeTrialConfiguration?.id ,
                 'Nombre student abonne': e.nombreStudentAbonne ,
                 'Nombre student present': e.nombreStudentPresent ,
                'Statut free trial': e.statutFreeTrial?.libelle ,
            }
        });

        this.criteriaData = [{
        //'Teacher': this.search.teacher?.libelle ? this.search.teacher?.libelle : environment.emptyForExport ,
        //'Level': this.search.level?.libelle ? this.search.level?.libelle : environment.emptyForExport ,
            'Date free trial Min': this.search.dateFreeTrialFrom ? this.datePipe.transform(this.search.dateFreeTrialFrom , this.dateFormat) : environment.emptyForExport ,
            'Date free trial Max': this.search.dateFreeTrialTo ? this.datePipe.transform(this.search.dateFreeTrialTo , this.dateFormat) : environment.emptyForExport ,
            'Link': this.search.link ? this.search.link : environment.emptyForExport ,
        //'Free trial student whats template': this.search.freeTrialStudentWhatsTemplate?.id ? this.search.freeTrialStudentWhatsTemplate?.id : environment.emptyForExport ,
        //'Free trial student email template': this.search.freeTrialStudentEmailTemplate?.id ? this.search.freeTrialStudentEmailTemplate?.id : environment.emptyForExport ,
        //'Free trial teacher email template': this.search.freeTrialTeacherEmailTemplate?.id ? this.search.freeTrialTeacherEmailTemplate?.id : environment.emptyForExport ,
        //'Free trial teacher whats template': this.search.freeTrialTeacherWhatsTemplate?.id ? this.search.freeTrialTeacherWhatsTemplate?.id : environment.emptyForExport ,
            'Date free trial premier rappel Min': this.search.dateFreeTrialPremierRappelFrom ? this.datePipe.transform(this.search.dateFreeTrialPremierRappelFrom , this.dateFormat) : environment.emptyForExport ,
            'Date free trial premier rappel Max': this.search.dateFreeTrialPremierRappelTo ? this.datePipe.transform(this.search.dateFreeTrialPremierRappelTo , this.dateFormat) : environment.emptyForExport ,
            'Date free trial premier deuxieme rappel Min': this.search.dateFreeTrialPremierDeuxiemeRappelFrom ? this.datePipe.transform(this.search.dateFreeTrialPremierDeuxiemeRappelFrom , this.dateFormat) : environment.emptyForExport ,
            'Date free trial premier deuxieme rappel Max': this.search.dateFreeTrialPremierDeuxiemeRappelTo ? this.datePipe.transform(this.search.dateFreeTrialPremierDeuxiemeRappelTo , this.dateFormat) : environment.emptyForExport ,
            'Nombre student total Min': this.search.nombreStudentTotalMin ? this.search.nombreStudentTotalMin : environment.emptyForExport ,
            'Nombre student total Max': this.search.nombreStudentTotalMax ? this.search.nombreStudentTotalMax : environment.emptyForExport ,
        //'Free trial configuration': this.search.freeTrialConfiguration?.id ? this.search.freeTrialConfiguration?.id : environment.emptyForExport ,
            'Nombre student abonne Min': this.search.nombreStudentAbonneMin ? this.search.nombreStudentAbonneMin : environment.emptyForExport ,
            'Nombre student abonne Max': this.search.nombreStudentAbonneMax ? this.search.nombreStudentAbonneMax : environment.emptyForExport ,
            'Nombre student present Min': this.search.nombreStudentPresentMin ? this.search.nombreStudentPresentMin : environment.emptyForExport ,
            'Nombre student present Max': this.search.nombreStudentPresentMax ? this.search.nombreStudentPresentMax : environment.emptyForExport ,
        //'Statut free trial': this.search.statutFreeTrial?.libelle ? this.search.statutFreeTrial?.libelle : environment.emptyForExport ,
        }];
      }

    get freeTrials() : Array<FreeTrialDto> {
           return this.freeTrialService.freeTrials;
    }
    set freeTrials(value: Array<FreeTrialDto>) {
        this.freeTrialService.freeTrials = value;
    }

    get freeTrialSelections() : Array<FreeTrialDto> {
           return this.freeTrialService.freeTrialSelections;
    }
    set freeTrialSelections(value: Array<FreeTrialDto>) {
        this.freeTrialService.freeTrialSelections = value;
    }

    get selectedFreeTrial() : FreeTrialDto {
           return this.freeTrialService.selectedFreeTrial;
    }
    set selectedFreeTrial(value: FreeTrialDto) {
        this.freeTrialService.selectedFreeTrial = value;
    }
    
    get createFreeTrialDialog() :boolean {
           return this.freeTrialService.createFreeTrialDialog;
    }
    set createFreeTrialDialog(value: boolean) {
        this.freeTrialService.createFreeTrialDialog= value;
    }
    
    get editFreeTrialDialog() :boolean {
           return this.freeTrialService.editFreeTrialDialog;
    }
    set editFreeTrialDialog(value: boolean) {
        this.freeTrialService.editFreeTrialDialog= value;
    }
    get viewFreeTrialDialog() :boolean {
           return this.freeTrialService.viewFreeTrialDialog;
    }
    set viewFreeTrialDialog(value: boolean) {
        this.freeTrialService.viewFreeTrialDialog = value;
    }
       
     get search() : FreeTrialCriteria {
        return this.freeTrialService.search;
     }
    set search(value: FreeTrialCriteria) {
        this.freeTrialService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
