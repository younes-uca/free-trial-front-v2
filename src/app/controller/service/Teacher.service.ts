import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {TeacherDto} from '../model/Teacher.model';
import {TeacherCriteria} from '../criteria/TeacherCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/teacher/';
        });
    }
     private _teachers: Array<TeacherDto> ;
     private _selectedTeacher: TeacherDto;
     private _teacherSelections: Array<TeacherDto>;
     private _createTeacherDialog: boolean;
     private _editTeacherDialog: boolean;
     private _viewTeacherDialog: boolean;
     public editTeacher$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: TeacherCriteria ;




    public findPaginatedByCriteria(criteria: TeacherCriteria): Observable<PaginatedList<TeacherDto>>{
        return this.http.post<PaginatedList<TeacherDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<TeacherDto>>(this.API);
    }

    public save(): Observable<TeacherDto> {
        return this.http.post<TeacherDto>(this.API, this.selectedTeacher);
    }

    delete(teacher: TeacherDto) {
         return this.http.delete<number>(this.API + 'id/' + teacher.id);
    }


    public edit(): Observable<TeacherDto> {
        return this.http.put<TeacherDto>(this.API, this.selectedTeacher);
    }


     public findByCriteria(teacher: TeacherCriteria): Observable<Array<TeacherDto>>{
           return this.http.post<Array<TeacherDto>>(this.API + 'find-by-criteria', teacher);
    }

   public findByIdWithAssociatedList(teacher:TeacherDto): Observable<TeacherDto>{
         return this.http.get<TeacherDto>(this.API + 'id/' +teacher.id);
    }

   public deleteMultiple(): Observable<Array<TeacherDto>>{
        return this.http.post<Array<TeacherDto>>(this.API + 'multiple',this.teacherSelections);
   }


    get teachers(): Array<TeacherDto> {
        if(this._teachers == null){
            this._teachers = new Array<TeacherDto>();
        }
        return this._teachers;
     }

    set teachers(value: Array<TeacherDto>) {
        this._teachers = value;
    }

    get selectedTeacher(): TeacherDto {
        if(this._selectedTeacher == null){
            this._selectedTeacher = new TeacherDto();
        }
        return this._selectedTeacher;
    }

    set selectedTeacher(value: TeacherDto) {
        this._selectedTeacher = value;
    }

    get teacherSelections(): Array<TeacherDto> {
        if(this._teacherSelections == null){
            this._teacherSelections = new Array<TeacherDto>();
        }
        return this._teacherSelections;
    }


    set teacherSelections(value: Array<TeacherDto>) {
        this._teacherSelections = value;
    }

    get createTeacherDialog(): boolean {
        return this._createTeacherDialog;
    }

    set createTeacherDialog(value: boolean) {
        this._createTeacherDialog = value;
    }

    get editTeacherDialog(): boolean {
        return this._editTeacherDialog;
    }

    set editTeacherDialog(value: boolean) {
        this._editTeacherDialog = value;
    }

    get viewTeacherDialog(): boolean {
        return this._viewTeacherDialog;
    }

    set viewTeacherDialog(value: boolean) {
        this._viewTeacherDialog = value;
    }

    get search(): TeacherCriteria {
         if(this._search==null){
            this._search = new TeacherCriteria();
        }
        return this._search;
    }

    set search(value: TeacherCriteria) {
        this._search = value;
    }
}
