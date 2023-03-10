import {Component, OnInit, Input} from '@angular/core';
import {StudentService} from 'src/app/controller/service/Student.service';
import {StudentDto} from 'src/app/controller/model/Student.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-student-create-admin',
  templateUrl: './student-create-admin.component.html'
})
export class StudentCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStudentLibelle = true;
   _validStudentCode = true;




    constructor(private datePipe: DatePipe, private studentService: StudentService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  

) {
}

    ngOnInit(): void {
}




private setValidation(value: boolean){
    this.validStudentLibelle = value;
    this.validStudentCode = value;
    }


    public save(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
      }
    }

    public saveWithShowOption(showList: boolean){
     this.studentService.save().subscribe(student=>{
        if(student != null){
           this.students.push({...student});
           this.createStudentDialog = false;
           this.submitted = false;
           this.selectedStudent = new StudentDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Student existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateStudentLibelle();
        this.validateStudentCode();
    }

    private validateStudentLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStudent.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validStudentLibelle = false;
        } else {
            this.validStudentLibelle = true;
        }
    }
    private validateStudentCode(){
        if (this.stringUtilService.isEmpty(this.selectedStudent.code)) {
        this.errorMessages.push('Code non valide');
        this.validStudentCode = false;
        } else {
            this.validStudentCode = true;
        }
    }









    hideCreateDialog(){
        this.createStudentDialog  = false;
        this.setValidation(true);
    }

    get students(): Array<StudentDto> {
        return this.studentService.students;
    }
    set students(value: Array<StudentDto>) {
            this.studentService.students = value;
    }
    get selectedStudent(): StudentDto {
               return this.studentService.selectedStudent;
     }
    set selectedStudent(value: StudentDto) {
        this.studentService.selectedStudent = value;
    }
    get createStudentDialog(): boolean {
        return this.studentService.createStudentDialog;
    }
    set createStudentDialog(value: boolean) {
        this.studentService.createStudentDialog= value;
    }


    get dateFormat(){
        return environment.dateFormatCreate;
    }
    get dateFormatColumn(){
        return environment.dateFormatCreate;
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
