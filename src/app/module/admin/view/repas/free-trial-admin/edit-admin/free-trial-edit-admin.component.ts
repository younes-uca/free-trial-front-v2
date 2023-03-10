import {Component, OnInit, Input} from '@angular/core';
import {FreeTrialService} from 'src/app/controller/service/FreeTrial.service';
import {FreeTrialDto} from 'src/app/controller/model/FreeTrial.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {StatutFreeTrialDto} from 'src/app/controller/model/StatutFreeTrial.model';
import {StatutFreeTrialService} from 'src/app/controller/service/StatutFreeTrial.service';
import {FreeTrialStudentEmailTemplateDto} from 'src/app/controller/model/FreeTrialStudentEmailTemplate.model';
import {FreeTrialStudentEmailTemplateService} from 'src/app/controller/service/FreeTrialStudentEmailTemplate.service';
import {FreeTrialConfigurationDto} from 'src/app/controller/model/FreeTrialConfiguration.model';
import {FreeTrialConfigurationService} from 'src/app/controller/service/FreeTrialConfiguration.service';
import {StudentDto} from 'src/app/controller/model/Student.model';
import {StudentService} from 'src/app/controller/service/Student.service';
import {TeacherDto} from 'src/app/controller/model/Teacher.model';
import {TeacherService} from 'src/app/controller/service/Teacher.service';
import {FreeTrialTeacherEmailTemplateDto} from 'src/app/controller/model/FreeTrialTeacherEmailTemplate.model';
import {FreeTrialTeacherEmailTemplateService} from 'src/app/controller/service/FreeTrialTeacherEmailTemplate.service';
import {FreeTrialTeacherWhatsTemplateDto} from 'src/app/controller/model/FreeTrialTeacherWhatsTemplate.model';
import {FreeTrialTeacherWhatsTemplateService} from 'src/app/controller/service/FreeTrialTeacherWhatsTemplate.service';
import {LevelDto} from 'src/app/controller/model/Level.model';
import {LevelService} from 'src/app/controller/service/Level.service';
import {FreeTrialStudentWhatsTemplateDto} from 'src/app/controller/model/FreeTrialStudentWhatsTemplate.model';
import {FreeTrialStudentWhatsTemplateService} from 'src/app/controller/service/FreeTrialStudentWhatsTemplate.service';
import {FreeTrialDetailDto} from 'src/app/controller/model/FreeTrialDetail.model';
import {FreeTrialDetailService} from 'src/app/controller/service/FreeTrialDetail.service';
@Component({
  selector: 'app-free-trial-edit-admin',
  templateUrl: './free-trial-edit-admin.component.html'
})
export class FreeTrialEditAdminComponent implements OnInit {

        selectedFreeTrialDetails = new FreeTrialDetailDto();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTeacherLibelle = true;
    _validTeacherCode = true;
    _validLevelLibelle = true;
    _validLevelCode = true;
    _validStatutFreeTrialLibelle = true;
    _validStatutFreeTrialCode = true;



    constructor(private datePipe: DatePipe, private freeTrialService: FreeTrialService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    , private teacherService: TeacherService, private freeTrialTeacherEmailTemplateService: FreeTrialTeacherEmailTemplateService, private statutFreeTrialService: StatutFreeTrialService, private freeTrialStudentEmailTemplateService: FreeTrialStudentEmailTemplateService, private freeTrialTeacherWhatsTemplateService: FreeTrialTeacherWhatsTemplateService, private freeTrialConfigurationService: FreeTrialConfigurationService, private levelService: LevelService, private studentService: StudentService, private freeTrialStudentWhatsTemplateService: FreeTrialStudentWhatsTemplateService, private freeTrialDetailService: FreeTrialDetailService
    ) {

    }

    ngOnInit(): void {

        this.selectedFreeTrialDetails.student = new StudentDto();
        this.studentService.findAll().subscribe((data) => this.students = data);


    this.selectedTeacher = new TeacherDto();
    this.teacherService.findAll().subscribe((data) => this.teachers = data);
    this.selectedLevel = new LevelDto();
    this.levelService.findAll().subscribe((data) => this.levels = data);
    this.selectedFreeTrialStudentWhatsTemplate = new FreeTrialStudentWhatsTemplateDto();
    this.freeTrialStudentWhatsTemplateService.findAll().subscribe((data) => this.freeTrialStudentWhatsTemplates = data);
    this.selectedFreeTrialStudentEmailTemplate = new FreeTrialStudentEmailTemplateDto();
    this.freeTrialStudentEmailTemplateService.findAll().subscribe((data) => this.freeTrialStudentEmailTemplates = data);
    this.selectedFreeTrialTeacherEmailTemplate = new FreeTrialTeacherEmailTemplateDto();
    this.freeTrialTeacherEmailTemplateService.findAll().subscribe((data) => this.freeTrialTeacherEmailTemplates = data);
    this.selectedFreeTrialTeacherWhatsTemplate = new FreeTrialTeacherWhatsTemplateDto();
    this.freeTrialTeacherWhatsTemplateService.findAll().subscribe((data) => this.freeTrialTeacherWhatsTemplates = data);
    this.selectedFreeTrialConfiguration = new FreeTrialConfigurationDto();
    this.freeTrialConfigurationService.findAll().subscribe((data) => this.freeTrialConfigurations = data);
    this.selectedStatutFreeTrial = new StatutFreeTrialDto();
    this.statutFreeTrialService.findAll().subscribe((data) => this.statutFreeTrials = data);
}


    validateFreeTrialDetails(){
    this.errorMessages = new Array();
    }


    private setValidation(value : boolean){
        }

    addFreeTrialDetails() {
        if( this.selectedFreeTrial.freeTrialDetails == null ){
            this.selectedFreeTrial.freeTrialDetails = new Array<FreeTrialDetailDto>();
        }
       this.validateFreeTrialDetails();
       if (this.errorMessages.length === 0) {
          this.selectedFreeTrial.freeTrialDetails.push(this.selectedFreeTrialDetails);
          this.selectedFreeTrialDetails = new FreeTrialDetailDto();
       }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
   }

    deleteFreeTrialDetails(p: FreeTrialDetailDto) {
        this.selectedFreeTrial.freeTrialDetails.forEach((element, index) => {
            if (element === p) { this.selectedFreeTrial.freeTrialDetails.splice(index, 1); }
        });
    }

    public edit(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
      }
    }

    public editWithShowOption(showList: boolean){
         this.freeTrialService.edit().subscribe(freeTrial=>{
         const myIndex = this.freeTrials.findIndex(e => e.id === this.selectedFreeTrial.id);
         this.freeTrials[myIndex] = freeTrial;
         this.editFreeTrialDialog = false;
         this.submitted = false;
         this.selectedFreeTrial = new FreeTrialDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
    }




      public async openCreateLevel(level: string) {
        const isPermistted = await this.roleService.isPermitted('Level', 'edit');
        if(isPermistted) {
             this.selectedLevel = new LevelDto();
             this.createLevelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateTeacher(teacher: string) {
        const isPermistted = await this.roleService.isPermitted('Teacher', 'edit');
        if(isPermistted) {
             this.selectedTeacher = new TeacherDto();
             this.createTeacherDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateFreeTrialTeacherWhatsTemplate(freeTrialTeacherWhatsTemplate: string) {
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherWhatsTemplate', 'edit');
        if(isPermistted) {
             this.selectedFreeTrialTeacherWhatsTemplate = new FreeTrialTeacherWhatsTemplateDto();
             this.createFreeTrialTeacherWhatsTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateFreeTrialStudentEmailTemplate(freeTrialStudentEmailTemplate: string) {
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentEmailTemplate', 'edit');
        if(isPermistted) {
             this.selectedFreeTrialStudentEmailTemplate = new FreeTrialStudentEmailTemplateDto();
             this.createFreeTrialStudentEmailTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateFreeTrialConfiguration(freeTrialConfiguration: string) {
        const isPermistted = await this.roleService.isPermitted('FreeTrialConfiguration', 'edit');
        if(isPermistted) {
             this.selectedFreeTrialConfiguration = new FreeTrialConfigurationDto();
             this.createFreeTrialConfigurationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateFreeTrialStudentWhatsTemplate(freeTrialStudentWhatsTemplate: string) {
        const isPermistted = await this.roleService.isPermitted('FreeTrialStudentWhatsTemplate', 'edit');
        if(isPermistted) {
             this.selectedFreeTrialStudentWhatsTemplate = new FreeTrialStudentWhatsTemplateDto();
             this.createFreeTrialStudentWhatsTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateStudent(student: string) {
        const isPermistted = await this.roleService.isPermitted('Student', 'edit');
        if(isPermistted) {
             this.selectedStudent = new StudentDto();
             this.createStudentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateStatutFreeTrial(statutFreeTrial: string) {
        const isPermistted = await this.roleService.isPermitted('StatutFreeTrial', 'edit');
        if(isPermistted) {
             this.selectedStatutFreeTrial = new StatutFreeTrialDto();
             this.createStatutFreeTrialDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateFreeTrialTeacherEmailTemplate(freeTrialTeacherEmailTemplate: string) {
        const isPermistted = await this.roleService.isPermitted('FreeTrialTeacherEmailTemplate', 'edit');
        if(isPermistted) {
             this.selectedFreeTrialTeacherEmailTemplate = new FreeTrialTeacherEmailTemplateDto();
             this.createFreeTrialTeacherEmailTemplateDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

    hideEditDialog(){
        this.editFreeTrialDialog  = false;
        this.setValidation(true);
    }

    get freeTrials(): Array<FreeTrialDto> {
        return this.freeTrialService.freeTrials;
    }
    set freeTrials(value: Array<FreeTrialDto>) {
            this.freeTrialService.freeTrials = value;
    }

    get selectedFreeTrial(): FreeTrialDto {
           return this.freeTrialService.selectedFreeTrial;
    }
    set selectedFreeTrial(value: FreeTrialDto) {
        this.freeTrialService.selectedFreeTrial = value;
    }

   get editFreeTrialDialog(): boolean {
           return this.freeTrialService.editFreeTrialDialog;
   }
    set editFreeTrialDialog(value: boolean) {
        this.freeTrialService.editFreeTrialDialog= value;
    }

   get selectedLevel(): LevelDto {
       return this.levelService.selectedLevel;
   }
  set selectedLevel(value: LevelDto) {
    this.levelService.selectedLevel = value;
   }
   get levels(): Array<LevelDto> {
       return this.levelService.levels;
   }
   set levels(value: Array<LevelDto>) {
    this.levelService.levels = value;
   }
   get createLevelDialog(): boolean {
       return this.levelService.createLevelDialog;
   }
  set createLevelDialog(value: boolean) {
    this.levelService.createLevelDialog= value;
   }
   get selectedTeacher(): TeacherDto {
       return this.teacherService.selectedTeacher;
   }
  set selectedTeacher(value: TeacherDto) {
    this.teacherService.selectedTeacher = value;
   }
   get teachers(): Array<TeacherDto> {
       return this.teacherService.teachers;
   }
   set teachers(value: Array<TeacherDto>) {
    this.teacherService.teachers = value;
   }
   get createTeacherDialog(): boolean {
       return this.teacherService.createTeacherDialog;
   }
  set createTeacherDialog(value: boolean) {
    this.teacherService.createTeacherDialog= value;
   }
   get selectedFreeTrialTeacherWhatsTemplate(): FreeTrialTeacherWhatsTemplateDto {
       return this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate;
   }
  set selectedFreeTrialTeacherWhatsTemplate(value: FreeTrialTeacherWhatsTemplateDto) {
    this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate = value;
   }
   get freeTrialTeacherWhatsTemplates(): Array<FreeTrialTeacherWhatsTemplateDto> {
       return this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates;
   }
   set freeTrialTeacherWhatsTemplates(value: Array<FreeTrialTeacherWhatsTemplateDto>) {
    this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates = value;
   }
   get createFreeTrialTeacherWhatsTemplateDialog(): boolean {
       return this.freeTrialTeacherWhatsTemplateService.createFreeTrialTeacherWhatsTemplateDialog;
   }
  set createFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
    this.freeTrialTeacherWhatsTemplateService.createFreeTrialTeacherWhatsTemplateDialog= value;
   }
   get selectedFreeTrialStudentEmailTemplate(): FreeTrialStudentEmailTemplateDto {
       return this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate;
   }
  set selectedFreeTrialStudentEmailTemplate(value: FreeTrialStudentEmailTemplateDto) {
    this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate = value;
   }
   get freeTrialStudentEmailTemplates(): Array<FreeTrialStudentEmailTemplateDto> {
       return this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates;
   }
   set freeTrialStudentEmailTemplates(value: Array<FreeTrialStudentEmailTemplateDto>) {
    this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates = value;
   }
   get createFreeTrialStudentEmailTemplateDialog(): boolean {
       return this.freeTrialStudentEmailTemplateService.createFreeTrialStudentEmailTemplateDialog;
   }
  set createFreeTrialStudentEmailTemplateDialog(value: boolean) {
    this.freeTrialStudentEmailTemplateService.createFreeTrialStudentEmailTemplateDialog= value;
   }
   get selectedFreeTrialConfiguration(): FreeTrialConfigurationDto {
       return this.freeTrialConfigurationService.selectedFreeTrialConfiguration;
   }
  set selectedFreeTrialConfiguration(value: FreeTrialConfigurationDto) {
    this.freeTrialConfigurationService.selectedFreeTrialConfiguration = value;
   }
   get freeTrialConfigurations(): Array<FreeTrialConfigurationDto> {
       return this.freeTrialConfigurationService.freeTrialConfigurations;
   }
   set freeTrialConfigurations(value: Array<FreeTrialConfigurationDto>) {
    this.freeTrialConfigurationService.freeTrialConfigurations = value;
   }
   get createFreeTrialConfigurationDialog(): boolean {
       return this.freeTrialConfigurationService.createFreeTrialConfigurationDialog;
   }
  set createFreeTrialConfigurationDialog(value: boolean) {
    this.freeTrialConfigurationService.createFreeTrialConfigurationDialog= value;
   }
   get selectedFreeTrialStudentWhatsTemplate(): FreeTrialStudentWhatsTemplateDto {
       return this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate;
   }
  set selectedFreeTrialStudentWhatsTemplate(value: FreeTrialStudentWhatsTemplateDto) {
    this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate = value;
   }
   get freeTrialStudentWhatsTemplates(): Array<FreeTrialStudentWhatsTemplateDto> {
       return this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates;
   }
   set freeTrialStudentWhatsTemplates(value: Array<FreeTrialStudentWhatsTemplateDto>) {
    this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates = value;
   }
   get createFreeTrialStudentWhatsTemplateDialog(): boolean {
       return this.freeTrialStudentWhatsTemplateService.createFreeTrialStudentWhatsTemplateDialog;
   }
  set createFreeTrialStudentWhatsTemplateDialog(value: boolean) {
    this.freeTrialStudentWhatsTemplateService.createFreeTrialStudentWhatsTemplateDialog= value;
   }
   get selectedStudent(): StudentDto {
       return this.studentService.selectedStudent;
   }
  set selectedStudent(value: StudentDto) {
    this.studentService.selectedStudent = value;
   }
   get students(): Array<StudentDto> {
       return this.studentService.students;
   }
   set students(value: Array<StudentDto>) {
    this.studentService.students = value;
   }
   get createStudentDialog(): boolean {
       return this.studentService.createStudentDialog;
   }
  set createStudentDialog(value: boolean) {
    this.studentService.createStudentDialog= value;
   }
   get selectedStatutFreeTrial(): StatutFreeTrialDto {
       return this.statutFreeTrialService.selectedStatutFreeTrial;
   }
  set selectedStatutFreeTrial(value: StatutFreeTrialDto) {
    this.statutFreeTrialService.selectedStatutFreeTrial = value;
   }
   get statutFreeTrials(): Array<StatutFreeTrialDto> {
       return this.statutFreeTrialService.statutFreeTrials;
   }
   set statutFreeTrials(value: Array<StatutFreeTrialDto>) {
    this.statutFreeTrialService.statutFreeTrials = value;
   }
   get createStatutFreeTrialDialog(): boolean {
       return this.statutFreeTrialService.createStatutFreeTrialDialog;
   }
  set createStatutFreeTrialDialog(value: boolean) {
    this.statutFreeTrialService.createStatutFreeTrialDialog= value;
   }
   get selectedFreeTrialTeacherEmailTemplate(): FreeTrialTeacherEmailTemplateDto {
       return this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate;
   }
  set selectedFreeTrialTeacherEmailTemplate(value: FreeTrialTeacherEmailTemplateDto) {
    this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate = value;
   }
   get freeTrialTeacherEmailTemplates(): Array<FreeTrialTeacherEmailTemplateDto> {
       return this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates;
   }
   set freeTrialTeacherEmailTemplates(value: Array<FreeTrialTeacherEmailTemplateDto>) {
    this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates = value;
   }
   get createFreeTrialTeacherEmailTemplateDialog(): boolean {
       return this.freeTrialTeacherEmailTemplateService.createFreeTrialTeacherEmailTemplateDialog;
   }
  set createFreeTrialTeacherEmailTemplateDialog(value: boolean) {
    this.freeTrialTeacherEmailTemplateService.createFreeTrialTeacherEmailTemplateDialog= value;
   }

    get dateFormat(){
        return environment.dateFormatEdit;
    }
    get dateFormatColumn(){
         return environment.dateFormatEdit;
     }
     get submitted(): boolean {
        return this._submitted;
    }
    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        return this._errorMessages;
    }
    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validTeacherLibelle(): boolean {
        return this._validTeacherLibelle;
    }

    set validTeacherLibelle(value: boolean) {
        this._validTeacherLibelle = value;
    }
    get validTeacherCode(): boolean {
        return this._validTeacherCode;
    }

    set validTeacherCode(value: boolean) {
        this._validTeacherCode = value;
    }
    get validLevelLibelle(): boolean {
        return this._validLevelLibelle;
    }

    set validLevelLibelle(value: boolean) {
        this._validLevelLibelle = value;
    }
    get validLevelCode(): boolean {
        return this._validLevelCode;
    }

    set validLevelCode(value: boolean) {
        this._validLevelCode = value;
    }
    get validStatutFreeTrialLibelle(): boolean {
        return this._validStatutFreeTrialLibelle;
    }

    set validStatutFreeTrialLibelle(value: boolean) {
        this._validStatutFreeTrialLibelle = value;
    }
    get validStatutFreeTrialCode(): boolean {
        return this._validStatutFreeTrialCode;
    }

    set validStatutFreeTrialCode(value: boolean) {
        this._validStatutFreeTrialCode = value;
    }
}
