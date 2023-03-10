import {Component, OnInit} from '@angular/core';
import {StudentService} from 'src/app/controller/service/Student.service';
import {StudentDto} from 'src/app/controller/model/Student.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-student-view-admin',
  templateUrl: './student-view-admin.component.html'
})
export class StudentViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private studentService: StudentService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewStudentDialog  = false;
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

   get viewStudentDialog(): boolean {
           return this.studentService.viewStudentDialog;
   }

    set viewStudentDialog(value: boolean) {
        this.studentService.viewStudentDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
