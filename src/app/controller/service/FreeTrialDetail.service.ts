import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {FreeTrialDetailDto} from '../model/FreeTrialDetail.model';
import {FreeTrialDetailCriteria} from '../criteria/FreeTrialDetailCriteria.model';
import {FreeTrialDto} from '../model/FreeTrial.model';
import {StudentDto} from '../model/Student.model';


@Injectable({
  providedIn: 'root'
})
export class FreeTrialDetailService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/freeTrialDetail/';
        });
    }
     private _freeTrialDetails: Array<FreeTrialDetailDto> ;
     private _selectedFreeTrialDetail: FreeTrialDetailDto;
     private _freeTrialDetailSelections: Array<FreeTrialDetailDto>;
     private _createFreeTrialDetailDialog: boolean;
     private _editFreeTrialDetailDialog: boolean;
     private _viewFreeTrialDetailDialog: boolean;
     public editFreeTrialDetail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: FreeTrialDetailCriteria ;




    public findPaginatedByCriteria(criteria: FreeTrialDetailCriteria): Observable<PaginatedList<FreeTrialDetailDto>>{
        return this.http.post<PaginatedList<FreeTrialDetailDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<FreeTrialDetailDto>>(this.API);
    }

    public save(): Observable<FreeTrialDetailDto> {
        return this.http.post<FreeTrialDetailDto>(this.API, this.selectedFreeTrialDetail);
    }

    delete(freeTrialDetail: FreeTrialDetailDto) {
         return this.http.delete<number>(this.API + 'id/' + freeTrialDetail.id);
    }


    public edit(): Observable<FreeTrialDetailDto> {
        return this.http.put<FreeTrialDetailDto>(this.API, this.selectedFreeTrialDetail);
    }


     public findByCriteria(freeTrialDetail: FreeTrialDetailCriteria): Observable<Array<FreeTrialDetailDto>>{
           return this.http.post<Array<FreeTrialDetailDto>>(this.API + 'find-by-criteria', freeTrialDetail);
    }

   public findByIdWithAssociatedList(freeTrialDetail:FreeTrialDetailDto): Observable<FreeTrialDetailDto>{
         return this.http.get<FreeTrialDetailDto>(this.API + 'id/' +freeTrialDetail.id);
    }

   public deleteMultiple(): Observable<Array<FreeTrialDetailDto>>{
        return this.http.post<Array<FreeTrialDetailDto>>(this.API + 'multiple',this.freeTrialDetailSelections);
   }


    get freeTrialDetails(): Array<FreeTrialDetailDto> {
        if(this._freeTrialDetails == null){
            this._freeTrialDetails = new Array<FreeTrialDetailDto>();
        }
        return this._freeTrialDetails;
     }

    set freeTrialDetails(value: Array<FreeTrialDetailDto>) {
        this._freeTrialDetails = value;
    }

    get selectedFreeTrialDetail(): FreeTrialDetailDto {
        if(this._selectedFreeTrialDetail == null){
            this._selectedFreeTrialDetail = new FreeTrialDetailDto();
        }
        return this._selectedFreeTrialDetail;
    }

    set selectedFreeTrialDetail(value: FreeTrialDetailDto) {
        this._selectedFreeTrialDetail = value;
    }

    get freeTrialDetailSelections(): Array<FreeTrialDetailDto> {
        if(this._freeTrialDetailSelections == null){
            this._freeTrialDetailSelections = new Array<FreeTrialDetailDto>();
        }
        return this._freeTrialDetailSelections;
    }


    set freeTrialDetailSelections(value: Array<FreeTrialDetailDto>) {
        this._freeTrialDetailSelections = value;
    }

    get createFreeTrialDetailDialog(): boolean {
        return this._createFreeTrialDetailDialog;
    }

    set createFreeTrialDetailDialog(value: boolean) {
        this._createFreeTrialDetailDialog = value;
    }

    get editFreeTrialDetailDialog(): boolean {
        return this._editFreeTrialDetailDialog;
    }

    set editFreeTrialDetailDialog(value: boolean) {
        this._editFreeTrialDetailDialog = value;
    }

    get viewFreeTrialDetailDialog(): boolean {
        return this._viewFreeTrialDetailDialog;
    }

    set viewFreeTrialDetailDialog(value: boolean) {
        this._viewFreeTrialDetailDialog = value;
    }

    get search(): FreeTrialDetailCriteria {
         if(this._search==null){
            this._search = new FreeTrialDetailCriteria();
        }
        return this._search;
    }

    set search(value: FreeTrialDetailCriteria) {
        this._search = value;
    }
}
