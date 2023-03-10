import {Component, OnInit, Input} from '@angular/core';
import {FreeTrialDetailService} from 'src/app/controller/service/FreeTrialDetail.service';
import {FreeTrialDetailDto} from 'src/app/controller/model/FreeTrialDetail.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {StudentDto} from 'src/app/controller/model/Student.model';
import {StudentService} from 'src/app/controller/service/Student.service';
import {FreeTrialDto} from 'src/app/controller/model/FreeTrial.model';
import {FreeTrialService} from 'src/app/controller/service/FreeTrial.service';
@Component({
  selector: 'app-free-trial-detail-edit-admin',
  templateUrl: './free-trial-detail-edit-admin.component.html'
})
export class FreeTrialDetailEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validStudentLibelle = true;
    _validStudentCode = true;



    constructor(private datePipe: DatePipe, private freeTrialDetailService: FreeTrialDetailService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    , private studentService: StudentService, private freeTrialService: FreeTrialService
    ) {

    }

    ngOnInit(): void {
    this.selectedFreeTrial = new FreeTrialDto();
    this.freeTrialService.findAll().subscribe((data) => this.freeTrials = data);
    this.selectedStudent = new StudentDto();
    this.studentService.findAll().subscribe((data) => this.students = data);
}




    private setValidation(value : boolean){
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
         this.freeTrialDetailService.edit().subscribe(freeTrialDetail=>{
         const myIndex = this.freeTrialDetails.findIndex(e => e.id === this.selectedFreeTrialDetail.id);
         this.freeTrialDetails[myIndex] = freeTrialDetail;
         this.editFreeTrialDetailDialog = false;
         this.submitted = false;
         this.selectedFreeTrialDetail = new FreeTrialDetailDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
    }




      public async openCreateFreeTrial(freeTrial: string) {
        const isPermistted = await this.roleService.isPermitted('FreeTrial', 'edit');
        if(isPermistted) {
             this.selectedFreeTrial = new FreeTrialDto();
             this.createFreeTrialDialog = true;
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

    hideEditDialog(){
        this.editFreeTrialDetailDialog  = false;
        this.setValidation(true);
    }

    get freeTrialDetails(): Array<FreeTrialDetailDto> {
        return this.freeTrialDetailService.freeTrialDetails;
    }
    set freeTrialDetails(value: Array<FreeTrialDetailDto>) {
            this.freeTrialDetailService.freeTrialDetails = value;
    }

    get selectedFreeTrialDetail(): FreeTrialDetailDto {
           return this.freeTrialDetailService.selectedFreeTrialDetail;
    }
    set selectedFreeTrialDetail(value: FreeTrialDetailDto) {
        this.freeTrialDetailService.selectedFreeTrialDetail = value;
    }

   get editFreeTrialDetailDialog(): boolean {
           return this.freeTrialDetailService.editFreeTrialDetailDialog;
   }
    set editFreeTrialDetailDialog(value: boolean) {
        this.freeTrialDetailService.editFreeTrialDetailDialog= value;
    }

   get selectedFreeTrial(): FreeTrialDto {
       return this.freeTrialService.selectedFreeTrial;
   }
  set selectedFreeTrial(value: FreeTrialDto) {
    this.freeTrialService.selectedFreeTrial = value;
   }
   get freeTrials(): Array<FreeTrialDto> {
       return this.freeTrialService.freeTrials;
   }
   set freeTrials(value: Array<FreeTrialDto>) {
    this.freeTrialService.freeTrials = value;
   }
   get createFreeTrialDialog(): boolean {
       return this.freeTrialService.createFreeTrialDialog;
   }
  set createFreeTrialDialog(value: boolean) {
    this.freeTrialService.createFreeTrialDialog= value;
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

    get validStudentLibelle(): boolean {
        return this._validStudentLibelle;
    }

    set validStudentLibelle(value: boolean) {
        this._validStudentLibelle = value;
    }
    get validStudentCode(): boolean {
        return this._validStudentCode;
    }

    set validStudentCode(value: boolean) {
        this._validStudentCode = value;
    }
}
