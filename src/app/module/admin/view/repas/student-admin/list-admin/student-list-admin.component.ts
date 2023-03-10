import {Component, OnInit} from '@angular/core';
import {StudentService} from 'src/app/controller/service/Student.service';
import {StudentDto} from 'src/app/controller/model/Student.model';
import {StudentCriteria} from 'src/app/controller/criteria/StudentCriteria.model';
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
  selector: 'app-student-list-admin',
  templateUrl: './student-list-admin.component.html'
})
export class StudentListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Student';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private studentService: StudentService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadStudents(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Student', 'list');
        isPermistted ? this.studentService.findAll().subscribe(students => this.students = students,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.studentService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.students = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new StudentCriteria();
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
    
    public async editStudent(student: StudentDto){
        const isPermistted = await this.roleService.isPermitted('Student', 'edit');
        if(isPermistted){
              this.studentService.findByIdWithAssociatedList(student).subscribe(res => {
              this.selectedStudent = res;

              this.editStudentDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewStudent(student: StudentDto){
        const isPermistted = await this.roleService.isPermitted('Student', 'view');
        if(isPermistted){
           this.studentService.findByIdWithAssociatedList(student).subscribe(res => {
           this.selectedStudent = res;
            this.viewStudentDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateStudent(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedStudent = new StudentDto();
            this.createStudentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Student', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.studentService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.students.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.students.splice(index,1);
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
        return this.studentSelections == null || this.studentSelections.length==0
    }


    public async deleteStudent(student: StudentDto){
       const isPermistted = await this.roleService.isPermitted('Student', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Student) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.studentService.delete(student).subscribe(status=>{
              if(status > 0){
                  const position = this.students.indexOf(student);
                  position > -1 ? this.students.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Student Supprimé',
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


    public async duplicateStudent(student: StudentDto) {
        this.studentService.findByIdWithAssociatedList(student).subscribe(
	    res => {
	       this.initDuplicateStudent(res);
	       this.selectedStudent = res;
	       this.selectedStudent.id = null;


            this.createStudentDialog = true;
        });

	}

	initDuplicateStudent(res: StudentDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.students.map(e => {
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

    get students() : Array<StudentDto> {
           return this.studentService.students;
    }
    set students(value: Array<StudentDto>) {
        this.studentService.students = value;
    }

    get studentSelections() : Array<StudentDto> {
           return this.studentService.studentSelections;
    }
    set studentSelections(value: Array<StudentDto>) {
        this.studentService.studentSelections = value;
    }

    get selectedStudent() : StudentDto {
           return this.studentService.selectedStudent;
    }
    set selectedStudent(value: StudentDto) {
        this.studentService.selectedStudent = value;
    }
    
    get createStudentDialog() :boolean {
           return this.studentService.createStudentDialog;
    }
    set createStudentDialog(value: boolean) {
        this.studentService.createStudentDialog= value;
    }
    
    get editStudentDialog() :boolean {
           return this.studentService.editStudentDialog;
    }
    set editStudentDialog(value: boolean) {
        this.studentService.editStudentDialog= value;
    }
    get viewStudentDialog() :boolean {
           return this.studentService.viewStudentDialog;
    }
    set viewStudentDialog(value: boolean) {
        this.studentService.viewStudentDialog = value;
    }
       
     get search() : StudentCriteria {
        return this.studentService.search;
     }
    set search(value: StudentCriteria) {
        this.studentService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
