import {Component, OnInit} from '@angular/core';
import {TeacherService} from 'src/app/controller/service/Teacher.service';
import {TeacherDto} from 'src/app/controller/model/Teacher.model';
import {TeacherCriteria} from 'src/app/controller/criteria/TeacherCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';




import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-teacher-list-admin',
  templateUrl: './teacher-list-admin.component.html'
})
export class TeacherListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Teacher';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private teacherService: TeacherService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadTeachers(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Teacher', 'list');
        isPermistted ? this.teacherService.findAll().subscribe(teachers => this.teachers = teachers,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.teacherService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.teachers = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new TeacherCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'email', header: 'Email'},
            {field: 'phone', header: 'Phone'},
        ];
    }
    
    public async editTeacher(teacher: TeacherDto){
        const isPermistted = await this.roleService.isPermitted('Teacher', 'edit');
        if(isPermistted){
              this.teacherService.findByIdWithAssociatedList(teacher).subscribe(res => {
              this.selectedTeacher = res;

              this.editTeacherDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewTeacher(teacher: TeacherDto){
        const isPermistted = await this.roleService.isPermitted('Teacher', 'view');
        if(isPermistted){
           this.teacherService.findByIdWithAssociatedList(teacher).subscribe(res => {
           this.selectedTeacher = res;
            this.viewTeacherDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateTeacher(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedTeacher = new TeacherDto();
            this.createTeacherDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Teacher', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.teacherService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.teachers.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.teachers.splice(index,1);
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
        return this.teacherSelections == null || this.teacherSelections.length==0
    }


    public async deleteTeacher(teacher: TeacherDto){
       const isPermistted = await this.roleService.isPermitted('Teacher', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Teacher) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.teacherService.delete(teacher).subscribe(status=>{
              if(status > 0){
                  const position = this.teachers.indexOf(teacher);
                  position > -1 ? this.teachers.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Teacher Supprimé',
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


    public async duplicateTeacher(teacher: TeacherDto) {
        this.teacherService.findByIdWithAssociatedList(teacher).subscribe(
	    res => {
	       this.initDuplicateTeacher(res);
	       this.selectedTeacher = res;
	       this.selectedTeacher.id = null;


            this.createTeacherDialog = true;
        });

	}

	initDuplicateTeacher(res: TeacherDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.teachers.map(e => {
            return {
                 'Libelle': e.libelle ,
                 'Code': e.code ,
                 'Email': e.email ,
                 'Phone': e.phone ,
            }
        });

        this.criteriaData = [{
            'Libelle': this.search.libelle ? this.search.libelle : environment.emptyForExport ,
            'Code': this.search.code ? this.search.code : environment.emptyForExport ,
            'Email': this.search.email ? this.search.email : environment.emptyForExport ,
            'Phone': this.search.phone ? this.search.phone : environment.emptyForExport ,
        }];
      }

    get teachers() : Array<TeacherDto> {
           return this.teacherService.teachers;
    }
    set teachers(value: Array<TeacherDto>) {
        this.teacherService.teachers = value;
    }

    get teacherSelections() : Array<TeacherDto> {
           return this.teacherService.teacherSelections;
    }
    set teacherSelections(value: Array<TeacherDto>) {
        this.teacherService.teacherSelections = value;
    }

    get selectedTeacher() : TeacherDto {
           return this.teacherService.selectedTeacher;
    }
    set selectedTeacher(value: TeacherDto) {
        this.teacherService.selectedTeacher = value;
    }
    
    get createTeacherDialog() :boolean {
           return this.teacherService.createTeacherDialog;
    }
    set createTeacherDialog(value: boolean) {
        this.teacherService.createTeacherDialog= value;
    }
    
    get editTeacherDialog() :boolean {
           return this.teacherService.editTeacherDialog;
    }
    set editTeacherDialog(value: boolean) {
        this.teacherService.editTeacherDialog= value;
    }
    get viewTeacherDialog() :boolean {
           return this.teacherService.viewTeacherDialog;
    }
    set viewTeacherDialog(value: boolean) {
        this.teacherService.viewTeacherDialog = value;
    }
       
     get search() : TeacherCriteria {
        return this.teacherService.search;
     }
    set search(value: TeacherCriteria) {
        this.teacherService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
