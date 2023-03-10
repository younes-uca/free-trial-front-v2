import {Component, OnInit} from '@angular/core';
import {FreeTrialService} from 'src/app/controller/service/FreeTrial.service';
import {FreeTrialDto} from 'src/app/controller/model/FreeTrial.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FreeTrialTeacherEmailTemplateDto} from 'src/app/controller/model/FreeTrialTeacherEmailTemplate.model';
import {FreeTrialTeacherEmailTemplateService} from 'src/app/controller/service/FreeTrialTeacherEmailTemplate.service';
import {FreeTrialTeacherWhatsTemplateDto} from 'src/app/controller/model/FreeTrialTeacherWhatsTemplate.model';
import {FreeTrialTeacherWhatsTemplateService} from 'src/app/controller/service/FreeTrialTeacherWhatsTemplate.service';
import {StatutFreeTrialDto} from 'src/app/controller/model/StatutFreeTrial.model';
import {StatutFreeTrialService} from 'src/app/controller/service/StatutFreeTrial.service';
import {StudentDto} from 'src/app/controller/model/Student.model';
import {StudentService} from 'src/app/controller/service/Student.service';
import {FreeTrialConfigurationDto} from 'src/app/controller/model/FreeTrialConfiguration.model';
import {FreeTrialConfigurationService} from 'src/app/controller/service/FreeTrialConfiguration.service';
import {FreeTrialStudentEmailTemplateDto} from 'src/app/controller/model/FreeTrialStudentEmailTemplate.model';
import {FreeTrialStudentEmailTemplateService} from 'src/app/controller/service/FreeTrialStudentEmailTemplate.service';
import {FreeTrialDetailDto} from 'src/app/controller/model/FreeTrialDetail.model';
import {FreeTrialDetailService} from 'src/app/controller/service/FreeTrialDetail.service';
import {TeacherDto} from 'src/app/controller/model/Teacher.model';
import {TeacherService} from 'src/app/controller/service/Teacher.service';
import {LevelDto} from 'src/app/controller/model/Level.model';
import {LevelService} from 'src/app/controller/service/Level.service';
import {FreeTrialStudentWhatsTemplateDto} from 'src/app/controller/model/FreeTrialStudentWhatsTemplate.model';
import {FreeTrialStudentWhatsTemplateService} from 'src/app/controller/service/FreeTrialStudentWhatsTemplate.service';

@Component({
  selector: 'app-free-trial-view-admin',
  templateUrl: './free-trial-view-admin.component.html'
})
export class FreeTrialViewAdminComponent implements OnInit {

    selectedFreeTrialDetails = new FreeTrialDetailDto();
    freeTrialDetailsListe: Array<FreeTrialDetailDto> = [];

    myStudents: Array<StudentDto> = [];


    constructor(private datePipe: DatePipe, private freeTrialService: FreeTrialService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ,private freeTrialTeacherEmailTemplateService: FreeTrialTeacherEmailTemplateService,private freeTrialTeacherWhatsTemplateService: FreeTrialTeacherWhatsTemplateService,private statutFreeTrialService: StatutFreeTrialService,private studentService: StudentService,private freeTrialConfigurationService: FreeTrialConfigurationService,private freeTrialStudentEmailTemplateService: FreeTrialStudentEmailTemplateService,private freeTrialDetailService: FreeTrialDetailService,private teacherService: TeacherService,private levelService: LevelService,private freeTrialStudentWhatsTemplateService: FreeTrialStudentWhatsTemplateService) {
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

    hideViewDialog(){
        this.viewFreeTrialDialog  = false;
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

   get viewFreeTrialDialog(): boolean {
           return this.freeTrialService.viewFreeTrialDialog;
   }

    set viewFreeTrialDialog(value: boolean) {
        this.freeTrialService.viewFreeTrialDialog= value;
   }

    get selectedLevel(): LevelDto {
       return this.levelService.selectedLevel;
    }
    set selectedLevel(value: LevelDto) {
    this.levelService.selectedLevel = value;
    }
    get levels():Array<LevelDto> {
       return this.levelService.levels;
    }
    set levels(value: Array<LevelDto>) {
    this.levelService.levels = value;
    }
    get editLevelDialog(): boolean {
       return this.levelService.editLevelDialog;
    }
    set editLevelDialog(value: boolean) {
    this.levelService.editLevelDialog= value;
    }
    get selectedTeacher(): TeacherDto {
       return this.teacherService.selectedTeacher;
    }
    set selectedTeacher(value: TeacherDto) {
    this.teacherService.selectedTeacher = value;
    }
    get teachers():Array<TeacherDto> {
       return this.teacherService.teachers;
    }
    set teachers(value: Array<TeacherDto>) {
    this.teacherService.teachers = value;
    }
    get editTeacherDialog(): boolean {
       return this.teacherService.editTeacherDialog;
    }
    set editTeacherDialog(value: boolean) {
    this.teacherService.editTeacherDialog= value;
    }
    get selectedFreeTrialTeacherWhatsTemplate(): FreeTrialTeacherWhatsTemplateDto {
       return this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate;
    }
    set selectedFreeTrialTeacherWhatsTemplate(value: FreeTrialTeacherWhatsTemplateDto) {
    this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate = value;
    }
    get freeTrialTeacherWhatsTemplates():Array<FreeTrialTeacherWhatsTemplateDto> {
       return this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates;
    }
    set freeTrialTeacherWhatsTemplates(value: Array<FreeTrialTeacherWhatsTemplateDto>) {
    this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates = value;
    }
    get editFreeTrialTeacherWhatsTemplateDialog(): boolean {
       return this.freeTrialTeacherWhatsTemplateService.editFreeTrialTeacherWhatsTemplateDialog;
    }
    set editFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
    this.freeTrialTeacherWhatsTemplateService.editFreeTrialTeacherWhatsTemplateDialog= value;
    }
    get selectedFreeTrialStudentEmailTemplate(): FreeTrialStudentEmailTemplateDto {
       return this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate;
    }
    set selectedFreeTrialStudentEmailTemplate(value: FreeTrialStudentEmailTemplateDto) {
    this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate = value;
    }
    get freeTrialStudentEmailTemplates():Array<FreeTrialStudentEmailTemplateDto> {
       return this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates;
    }
    set freeTrialStudentEmailTemplates(value: Array<FreeTrialStudentEmailTemplateDto>) {
    this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates = value;
    }
    get editFreeTrialStudentEmailTemplateDialog(): boolean {
       return this.freeTrialStudentEmailTemplateService.editFreeTrialStudentEmailTemplateDialog;
    }
    set editFreeTrialStudentEmailTemplateDialog(value: boolean) {
    this.freeTrialStudentEmailTemplateService.editFreeTrialStudentEmailTemplateDialog= value;
    }
    get selectedFreeTrialConfiguration(): FreeTrialConfigurationDto {
       return this.freeTrialConfigurationService.selectedFreeTrialConfiguration;
    }
    set selectedFreeTrialConfiguration(value: FreeTrialConfigurationDto) {
    this.freeTrialConfigurationService.selectedFreeTrialConfiguration = value;
    }
    get freeTrialConfigurations():Array<FreeTrialConfigurationDto> {
       return this.freeTrialConfigurationService.freeTrialConfigurations;
    }
    set freeTrialConfigurations(value: Array<FreeTrialConfigurationDto>) {
    this.freeTrialConfigurationService.freeTrialConfigurations = value;
    }
    get editFreeTrialConfigurationDialog(): boolean {
       return this.freeTrialConfigurationService.editFreeTrialConfigurationDialog;
    }
    set editFreeTrialConfigurationDialog(value: boolean) {
    this.freeTrialConfigurationService.editFreeTrialConfigurationDialog= value;
    }
    get selectedFreeTrialStudentWhatsTemplate(): FreeTrialStudentWhatsTemplateDto {
       return this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate;
    }
    set selectedFreeTrialStudentWhatsTemplate(value: FreeTrialStudentWhatsTemplateDto) {
    this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate = value;
    }
    get freeTrialStudentWhatsTemplates():Array<FreeTrialStudentWhatsTemplateDto> {
       return this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates;
    }
    set freeTrialStudentWhatsTemplates(value: Array<FreeTrialStudentWhatsTemplateDto>) {
    this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates = value;
    }
    get editFreeTrialStudentWhatsTemplateDialog(): boolean {
       return this.freeTrialStudentWhatsTemplateService.editFreeTrialStudentWhatsTemplateDialog;
    }
    set editFreeTrialStudentWhatsTemplateDialog(value: boolean) {
    this.freeTrialStudentWhatsTemplateService.editFreeTrialStudentWhatsTemplateDialog= value;
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
    get selectedStatutFreeTrial(): StatutFreeTrialDto {
       return this.statutFreeTrialService.selectedStatutFreeTrial;
    }
    set selectedStatutFreeTrial(value: StatutFreeTrialDto) {
    this.statutFreeTrialService.selectedStatutFreeTrial = value;
    }
    get statutFreeTrials():Array<StatutFreeTrialDto> {
       return this.statutFreeTrialService.statutFreeTrials;
    }
    set statutFreeTrials(value: Array<StatutFreeTrialDto>) {
    this.statutFreeTrialService.statutFreeTrials = value;
    }
    get editStatutFreeTrialDialog(): boolean {
       return this.statutFreeTrialService.editStatutFreeTrialDialog;
    }
    set editStatutFreeTrialDialog(value: boolean) {
    this.statutFreeTrialService.editStatutFreeTrialDialog= value;
    }
    get selectedFreeTrialTeacherEmailTemplate(): FreeTrialTeacherEmailTemplateDto {
       return this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate;
    }
    set selectedFreeTrialTeacherEmailTemplate(value: FreeTrialTeacherEmailTemplateDto) {
    this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate = value;
    }
    get freeTrialTeacherEmailTemplates():Array<FreeTrialTeacherEmailTemplateDto> {
       return this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates;
    }
    set freeTrialTeacherEmailTemplates(value: Array<FreeTrialTeacherEmailTemplateDto>) {
    this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates = value;
    }
    get editFreeTrialTeacherEmailTemplateDialog(): boolean {
       return this.freeTrialTeacherEmailTemplateService.editFreeTrialTeacherEmailTemplateDialog;
    }
    set editFreeTrialTeacherEmailTemplateDialog(value: boolean) {
    this.freeTrialTeacherEmailTemplateService.editFreeTrialTeacherEmailTemplateDialog= value;
    }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
