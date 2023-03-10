import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {StudentDto} from '../model/Student.model';
import {StudentCriteria} from '../criteria/StudentCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/student/';
        });
    }
     private _students: Array<StudentDto> ;
     private _selectedStudent: StudentDto;
     private _studentSelections: Array<StudentDto>;
     private _createStudentDialog: boolean;
     private _editStudentDialog: boolean;
     private _viewStudentDialog: boolean;
     public editStudent$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: StudentCriteria ;




    public findPaginatedByCriteria(criteria: StudentCriteria): Observable<PaginatedList<StudentDto>>{
        return this.http.post<PaginatedList<StudentDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<StudentDto>>(this.API);
    }

    public save(): Observable<StudentDto> {
        return this.http.post<StudentDto>(this.API, this.selectedStudent);
    }

    delete(student: StudentDto) {
         return this.http.delete<number>(this.API + 'id/' + student.id);
    }


    public edit(): Observable<StudentDto> {
        return this.http.put<StudentDto>(this.API, this.selectedStudent);
    }


     public findByCriteria(student: StudentCriteria): Observable<Array<StudentDto>>{
           return this.http.post<Array<StudentDto>>(this.API + 'find-by-criteria', student);
    }

   public findByIdWithAssociatedList(student:StudentDto): Observable<StudentDto>{
         return this.http.get<StudentDto>(this.API + 'id/' +student.id);
    }

   public deleteMultiple(): Observable<Array<StudentDto>>{
        return this.http.post<Array<StudentDto>>(this.API + 'multiple',this.studentSelections);
   }


    get students(): Array<StudentDto> {
        if(this._students == null){
            this._students = new Array<StudentDto>();
        }
        return this._students;
     }

    set students(value: Array<StudentDto>) {
        this._students = value;
    }

    get selectedStudent(): StudentDto {
        if(this._selectedStudent == null){
            this._selectedStudent = new StudentDto();
        }
        return this._selectedStudent;
    }

    set selectedStudent(value: StudentDto) {
        this._selectedStudent = value;
    }

    get studentSelections(): Array<StudentDto> {
        if(this._studentSelections == null){
            this._studentSelections = new Array<StudentDto>();
        }
        return this._studentSelections;
    }


    set studentSelections(value: Array<StudentDto>) {
        this._studentSelections = value;
    }

    get createStudentDialog(): boolean {
        return this._createStudentDialog;
    }

    set createStudentDialog(value: boolean) {
        this._createStudentDialog = value;
    }

    get editStudentDialog(): boolean {
        return this._editStudentDialog;
    }

    set editStudentDialog(value: boolean) {
        this._editStudentDialog = value;
    }

    get viewStudentDialog(): boolean {
        return this._viewStudentDialog;
    }

    set viewStudentDialog(value: boolean) {
        this._viewStudentDialog = value;
    }

    get search(): StudentCriteria {
         if(this._search==null){
            this._search = new StudentCriteria();
        }
        return this._search;
    }

    set search(value: StudentCriteria) {
        this._search = value;
    }
}
