import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {StatutFreeTrialDto} from '../model/StatutFreeTrial.model';
import {StatutFreeTrialCriteria} from '../criteria/StatutFreeTrialCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class StatutFreeTrialService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/statutFreeTrial/';
        });
    }
     private _statutFreeTrials: Array<StatutFreeTrialDto> ;
     private _selectedStatutFreeTrial: StatutFreeTrialDto;
     private _statutFreeTrialSelections: Array<StatutFreeTrialDto>;
     private _createStatutFreeTrialDialog: boolean;
     private _editStatutFreeTrialDialog: boolean;
     private _viewStatutFreeTrialDialog: boolean;
     public editStatutFreeTrial$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: StatutFreeTrialCriteria ;




    public findPaginatedByCriteria(criteria: StatutFreeTrialCriteria): Observable<PaginatedList<StatutFreeTrialDto>>{
        return this.http.post<PaginatedList<StatutFreeTrialDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<StatutFreeTrialDto>>(this.API);
    }

    public save(): Observable<StatutFreeTrialDto> {
        return this.http.post<StatutFreeTrialDto>(this.API, this.selectedStatutFreeTrial);
    }

    delete(statutFreeTrial: StatutFreeTrialDto) {
         return this.http.delete<number>(this.API + 'id/' + statutFreeTrial.id);
    }


    public edit(): Observable<StatutFreeTrialDto> {
        return this.http.put<StatutFreeTrialDto>(this.API, this.selectedStatutFreeTrial);
    }


     public findByCriteria(statutFreeTrial: StatutFreeTrialCriteria): Observable<Array<StatutFreeTrialDto>>{
           return this.http.post<Array<StatutFreeTrialDto>>(this.API + 'find-by-criteria', statutFreeTrial);
    }

   public findByIdWithAssociatedList(statutFreeTrial:StatutFreeTrialDto): Observable<StatutFreeTrialDto>{
         return this.http.get<StatutFreeTrialDto>(this.API + 'id/' +statutFreeTrial.id);
    }

   public deleteMultiple(): Observable<Array<StatutFreeTrialDto>>{
        return this.http.post<Array<StatutFreeTrialDto>>(this.API + 'multiple',this.statutFreeTrialSelections);
   }


    get statutFreeTrials(): Array<StatutFreeTrialDto> {
        if(this._statutFreeTrials == null){
            this._statutFreeTrials = new Array<StatutFreeTrialDto>();
        }
        return this._statutFreeTrials;
     }

    set statutFreeTrials(value: Array<StatutFreeTrialDto>) {
        this._statutFreeTrials = value;
    }

    get selectedStatutFreeTrial(): StatutFreeTrialDto {
        if(this._selectedStatutFreeTrial == null){
            this._selectedStatutFreeTrial = new StatutFreeTrialDto();
        }
        return this._selectedStatutFreeTrial;
    }

    set selectedStatutFreeTrial(value: StatutFreeTrialDto) {
        this._selectedStatutFreeTrial = value;
    }

    get statutFreeTrialSelections(): Array<StatutFreeTrialDto> {
        if(this._statutFreeTrialSelections == null){
            this._statutFreeTrialSelections = new Array<StatutFreeTrialDto>();
        }
        return this._statutFreeTrialSelections;
    }


    set statutFreeTrialSelections(value: Array<StatutFreeTrialDto>) {
        this._statutFreeTrialSelections = value;
    }

    get createStatutFreeTrialDialog(): boolean {
        return this._createStatutFreeTrialDialog;
    }

    set createStatutFreeTrialDialog(value: boolean) {
        this._createStatutFreeTrialDialog = value;
    }

    get editStatutFreeTrialDialog(): boolean {
        return this._editStatutFreeTrialDialog;
    }

    set editStatutFreeTrialDialog(value: boolean) {
        this._editStatutFreeTrialDialog = value;
    }

    get viewStatutFreeTrialDialog(): boolean {
        return this._viewStatutFreeTrialDialog;
    }

    set viewStatutFreeTrialDialog(value: boolean) {
        this._viewStatutFreeTrialDialog = value;
    }

    get search(): StatutFreeTrialCriteria {
         if(this._search==null){
            this._search = new StatutFreeTrialCriteria();
        }
        return this._search;
    }

    set search(value: StatutFreeTrialCriteria) {
        this._search = value;
    }
}
