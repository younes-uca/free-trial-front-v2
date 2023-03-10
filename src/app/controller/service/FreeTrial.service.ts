import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {FreeTrialDto} from '../model/FreeTrial.model';
import {FreeTrialCriteria} from '../criteria/FreeTrialCriteria.model';
import {FreeTrialTeacherEmailTemplateDto} from '../model/FreeTrialTeacherEmailTemplate.model';
import {FreeTrialTeacherWhatsTemplateDto} from '../model/FreeTrialTeacherWhatsTemplate.model';
import {StatutFreeTrialDto} from '../model/StatutFreeTrial.model';
import {FreeTrialConfigurationDto} from '../model/FreeTrialConfiguration.model';
import {FreeTrialStudentEmailTemplateDto} from '../model/FreeTrialStudentEmailTemplate.model';
import {FreeTrialDetailDto} from '../model/FreeTrialDetail.model';
import {TeacherDto} from '../model/Teacher.model';
import {LevelDto} from '../model/Level.model';
import {FreeTrialStudentWhatsTemplateDto} from '../model/FreeTrialStudentWhatsTemplate.model';


@Injectable({
  providedIn: 'root'
})
export class FreeTrialService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/freeTrial/';
        });
    }
     private _freeTrials: Array<FreeTrialDto> ;
     private _selectedFreeTrial: FreeTrialDto;
     private _freeTrialSelections: Array<FreeTrialDto>;
     private _createFreeTrialDialog: boolean;
     private _editFreeTrialDialog: boolean;
     private _viewFreeTrialDialog: boolean;
     public editFreeTrial$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: FreeTrialCriteria ;




    public findPaginatedByCriteria(criteria: FreeTrialCriteria): Observable<PaginatedList<FreeTrialDto>>{
        return this.http.post<PaginatedList<FreeTrialDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<FreeTrialDto>>(this.API);
    }

    public findAppropriateFreeTrials(){
        return this.http.get<Array<FreeTrialDto>>(this.API + "appropriateFreeTrials" );
    }

    public save(): Observable<FreeTrialDto> {
        return this.http.post<FreeTrialDto>(this.API, this.selectedFreeTrial);
    }

    delete(freeTrial: FreeTrialDto) {
         return this.http.delete<number>(this.API + 'id/' + freeTrial.id);
    }


    public edit(): Observable<FreeTrialDto> {
        return this.http.put<FreeTrialDto>(this.API, this.selectedFreeTrial);
    }


     public findByCriteria(freeTrial: FreeTrialCriteria): Observable<Array<FreeTrialDto>>{
           return this.http.post<Array<FreeTrialDto>>(this.API + 'find-by-criteria', freeTrial);
    }

   public findByIdWithAssociatedList(freeTrial:FreeTrialDto): Observable<FreeTrialDto>{
         return this.http.get<FreeTrialDto>(this.API + 'id/' +freeTrial.id);
    }

   public deleteMultiple(): Observable<Array<FreeTrialDto>>{
        return this.http.post<Array<FreeTrialDto>>(this.API + 'multiple',this.freeTrialSelections);
   }


    get freeTrials(): Array<FreeTrialDto> {
        if(this._freeTrials == null){
            this._freeTrials = new Array<FreeTrialDto>();
        }
        return this._freeTrials;
     }

    set freeTrials(value: Array<FreeTrialDto>) {
        this._freeTrials = value;
    }

    get selectedFreeTrial(): FreeTrialDto {
        if(this._selectedFreeTrial == null){
            this._selectedFreeTrial = new FreeTrialDto();
        }
        return this._selectedFreeTrial;
    }

    set selectedFreeTrial(value: FreeTrialDto) {
        this._selectedFreeTrial = value;
    }

    get freeTrialSelections(): Array<FreeTrialDto> {
        if(this._freeTrialSelections == null){
            this._freeTrialSelections = new Array<FreeTrialDto>();
        }
        return this._freeTrialSelections;
    }


    set freeTrialSelections(value: Array<FreeTrialDto>) {
        this._freeTrialSelections = value;
    }

    get createFreeTrialDialog(): boolean {
        return this._createFreeTrialDialog;
    }

    set createFreeTrialDialog(value: boolean) {
        this._createFreeTrialDialog = value;
    }

    get editFreeTrialDialog(): boolean {
        return this._editFreeTrialDialog;
    }

    set editFreeTrialDialog(value: boolean) {
        this._editFreeTrialDialog = value;
    }

    get viewFreeTrialDialog(): boolean {
        return this._viewFreeTrialDialog;
    }

    set viewFreeTrialDialog(value: boolean) {
        this._viewFreeTrialDialog = value;
    }

    get search(): FreeTrialCriteria {
         if(this._search==null){
            this._search = new FreeTrialCriteria();
        }
        return this._search;
    }

    set search(value: FreeTrialCriteria) {
        this._search = value;
    }
}
