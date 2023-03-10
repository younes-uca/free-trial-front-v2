import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {LevelDto} from '../model/Level.model';
import {LevelCriteria} from '../criteria/LevelCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class LevelService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/level/';
        });
    }
     private _levels: Array<LevelDto> ;
     private _selectedLevel: LevelDto;
     private _levelSelections: Array<LevelDto>;
     private _createLevelDialog: boolean;
     private _editLevelDialog: boolean;
     private _viewLevelDialog: boolean;
     public editLevel$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: LevelCriteria ;




    public findPaginatedByCriteria(criteria: LevelCriteria): Observable<PaginatedList<LevelDto>>{
        return this.http.post<PaginatedList<LevelDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<LevelDto>>(this.API);
    }

    public save(): Observable<LevelDto> {
        return this.http.post<LevelDto>(this.API, this.selectedLevel);
    }

    delete(level: LevelDto) {
         return this.http.delete<number>(this.API + 'id/' + level.id);
    }


    public edit(): Observable<LevelDto> {
        return this.http.put<LevelDto>(this.API, this.selectedLevel);
    }


     public findByCriteria(level: LevelCriteria): Observable<Array<LevelDto>>{
           return this.http.post<Array<LevelDto>>(this.API + 'find-by-criteria', level);
    }

   public findByIdWithAssociatedList(level:LevelDto): Observable<LevelDto>{
         return this.http.get<LevelDto>(this.API + 'id/' +level.id);
    }

   public deleteMultiple(): Observable<Array<LevelDto>>{
        return this.http.post<Array<LevelDto>>(this.API + 'multiple',this.levelSelections);
   }


    get levels(): Array<LevelDto> {
        if(this._levels == null){
            this._levels = new Array<LevelDto>();
        }
        return this._levels;
     }

    set levels(value: Array<LevelDto>) {
        this._levels = value;
    }

    get selectedLevel(): LevelDto {
        if(this._selectedLevel == null){
            this._selectedLevel = new LevelDto();
        }
        return this._selectedLevel;
    }

    set selectedLevel(value: LevelDto) {
        this._selectedLevel = value;
    }

    get levelSelections(): Array<LevelDto> {
        if(this._levelSelections == null){
            this._levelSelections = new Array<LevelDto>();
        }
        return this._levelSelections;
    }


    set levelSelections(value: Array<LevelDto>) {
        this._levelSelections = value;
    }

    get createLevelDialog(): boolean {
        return this._createLevelDialog;
    }

    set createLevelDialog(value: boolean) {
        this._createLevelDialog = value;
    }

    get editLevelDialog(): boolean {
        return this._editLevelDialog;
    }

    set editLevelDialog(value: boolean) {
        this._editLevelDialog = value;
    }

    get viewLevelDialog(): boolean {
        return this._viewLevelDialog;
    }

    set viewLevelDialog(value: boolean) {
        this._viewLevelDialog = value;
    }

    get search(): LevelCriteria {
         if(this._search==null){
            this._search = new LevelCriteria();
        }
        return this._search;
    }

    set search(value: LevelCriteria) {
        this._search = value;
    }
}
