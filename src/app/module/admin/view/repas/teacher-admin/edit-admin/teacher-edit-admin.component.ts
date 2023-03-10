import {Component, OnInit, Input} from '@angular/core';
import {TeacherService} from 'src/app/controller/service/Teacher.service';
import {TeacherDto} from 'src/app/controller/model/Teacher.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-teacher-edit-admin',
  templateUrl: './teacher-edit-admin.component.html'
})
export class TeacherEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTeacherLibelle = true;
   _validTeacherCode = true;




    constructor(private datePipe: DatePipe, private teacherService: TeacherService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    
    ) {

    }

    ngOnInit(): void {
}




    private setValidation(value : boolean){
        this.validTeacherLibelle = value;
        this.validTeacherCode = value;
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
         this.teacherService.edit().subscribe(teacher=>{
         const myIndex = this.teachers.findIndex(e => e.id === this.selectedTeacher.id);
         this.teachers[myIndex] = teacher;
         this.editTeacherDialog = false;
         this.submitted = false;
         this.selectedTeacher = new TeacherDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
        this.validateTeacherLibelle();
        this.validateTeacherCode();
    }

    private validateTeacherLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTeacher.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTeacherLibelle = false;
        } else {
            this.validTeacherLibelle = true;
        }
    }
    private validateTeacherCode(){
        if (this.stringUtilService.isEmpty(this.selectedTeacher.code)) {
            this.errorMessages.push('Code non valide');
            this.validTeacherCode = false;
        } else {
            this.validTeacherCode = true;
        }
    }




    hideEditDialog(){
        this.editTeacherDialog  = false;
        this.setValidation(true);
    }

    get teachers(): Array<TeacherDto> {
        return this.teacherService.teachers;
    }
    set teachers(value: Array<TeacherDto>) {
            this.teacherService.teachers = value;
    }

    get selectedTeacher(): TeacherDto {
           return this.teacherService.selectedTeacher;
    }
    set selectedTeacher(value: TeacherDto) {
        this.teacherService.selectedTeacher = value;
    }

   get editTeacherDialog(): boolean {
           return this.teacherService.editTeacherDialog;
   }
    set editTeacherDialog(value: boolean) {
        this.teacherService.editTeacherDialog= value;
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

}
