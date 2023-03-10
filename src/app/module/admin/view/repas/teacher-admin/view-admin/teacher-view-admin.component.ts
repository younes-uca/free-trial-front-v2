import {Component, OnInit} from '@angular/core';
import {TeacherService} from 'src/app/controller/service/Teacher.service';
import {TeacherDto} from 'src/app/controller/model/Teacher.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-teacher-view-admin',
  templateUrl: './teacher-view-admin.component.html'
})
export class TeacherViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private teacherService: TeacherService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewTeacherDialog  = false;
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

   get viewTeacherDialog(): boolean {
           return this.teacherService.viewTeacherDialog;
   }

    set viewTeacherDialog(value: boolean) {
        this.teacherService.viewTeacherDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
