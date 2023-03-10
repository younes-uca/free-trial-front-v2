import {Component, OnInit} from '@angular/core';
import {FreeTrialDetailService} from 'src/app/controller/service/FreeTrialDetail.service';
import {FreeTrialDetailDto} from 'src/app/controller/model/FreeTrialDetail.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FreeTrialDto} from 'src/app/controller/model/FreeTrial.model';
import {FreeTrialService} from 'src/app/controller/service/FreeTrial.service';
import {StudentDto} from 'src/app/controller/model/Student.model';
import {StudentService} from 'src/app/controller/service/Student.service';

@Component({
  selector: 'app-free-trial-detail-view-admin',
  templateUrl: './free-trial-detail-view-admin.component.html'
})
export class FreeTrialDetailViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private freeTrialDetailService: FreeTrialDetailService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ,private freeTrialService: FreeTrialService,private studentService: StudentService) {
    }


    ngOnInit(): void {
        this.selectedFreeTrial = new FreeTrialDto();
        this.freeTrialService.findAll().subscribe((data) => this.freeTrials = data);
        this.selectedStudent = new StudentDto();
        this.studentService.findAll().subscribe((data) => this.students = data);
    }

    hideViewDialog(){
        this.viewFreeTrialDetailDialog  = false;
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

   get viewFreeTrialDetailDialog(): boolean {
           return this.freeTrialDetailService.viewFreeTrialDetailDialog;
   }

    set viewFreeTrialDetailDialog(value: boolean) {
        this.freeTrialDetailService.viewFreeTrialDetailDialog= value;
   }

    get selectedFreeTrial(): FreeTrialDto {
       return this.freeTrialService.selectedFreeTrial;
    }
    set selectedFreeTrial(value: FreeTrialDto) {
    this.freeTrialService.selectedFreeTrial = value;
    }
    get freeTrials():Array<FreeTrialDto> {
       return this.freeTrialService.freeTrials;
    }
    set freeTrials(value: Array<FreeTrialDto>) {
    this.freeTrialService.freeTrials = value;
    }
    get editFreeTrialDialog(): boolean {
       return this.freeTrialService.editFreeTrialDialog;
    }
    set editFreeTrialDialog(value: boolean) {
    this.freeTrialService.editFreeTrialDialog= value;
    }
    get selectedStudent(): StudentDto {
       return this.studentService.selectedStudent;
    }
    set selectedStudent(value: StudentDto) {
    this.studentService.selectedStudent = value;
    }
    get students():Array<StudentDto> {
       return this.studentService.students;
    }
    set students(value: Array<StudentDto>) {
    this.studentService.students = value;
    }
    get editStudentDialog(): boolean {
       return this.studentService.editStudentDialog;
    }
    set editStudentDialog(value: boolean) {
    this.studentService.editStudentDialog= value;
    }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
