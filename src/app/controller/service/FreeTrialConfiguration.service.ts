import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {FreeTrialConfigurationDto} from '../model/FreeTrialConfiguration.model';
import {FreeTrialConfigurationCriteria} from '../criteria/FreeTrialConfigurationCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class FreeTrialConfigurationService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/freeTrialConfiguration/';
        });
    }
     private _freeTrialConfigurations: Array<FreeTrialConfigurationDto> ;
     private _selectedFreeTrialConfiguration: FreeTrialConfigurationDto;
     private _freeTrialConfigurationSelections: Array<FreeTrialConfigurationDto>;
     private _createFreeTrialConfigurationDialog: boolean;
     private _editFreeTrialConfigurationDialog: boolean;
     private _viewFreeTrialConfigurationDialog: boolean;
     public editFreeTrialConfiguration$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: FreeTrialConfigurationCriteria ;




    public findPaginatedByCriteria(criteria: FreeTrialConfigurationCriteria): Observable<PaginatedList<FreeTrialConfigurationDto>>{
        return this.http.post<PaginatedList<FreeTrialConfigurationDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<FreeTrialConfigurationDto>>(this.API);
    }

    public save(): Observable<FreeTrialConfigurationDto> {
        return this.http.post<FreeTrialConfigurationDto>(this.API, this.selectedFreeTrialConfiguration);
    }

    delete(freeTrialConfiguration: FreeTrialConfigurationDto) {
         return this.http.delete<number>(this.API + 'id/' + freeTrialConfiguration.id);
    }


    public edit(): Observable<FreeTrialConfigurationDto> {
        return this.http.put<FreeTrialConfigurationDto>(this.API, this.selectedFreeTrialConfiguration);
    }


     public findByCriteria(freeTrialConfiguration: FreeTrialConfigurationCriteria): Observable<Array<FreeTrialConfigurationDto>>{
           return this.http.post<Array<FreeTrialConfigurationDto>>(this.API + 'find-by-criteria', freeTrialConfiguration);
    }

   public findByIdWithAssociatedList(freeTrialConfiguration:FreeTrialConfigurationDto): Observable<FreeTrialConfigurationDto>{
         return this.http.get<FreeTrialConfigurationDto>(this.API + 'id/' +freeTrialConfiguration.id);
    }

   public deleteMultiple(): Observable<Array<FreeTrialConfigurationDto>>{
        return this.http.post<Array<FreeTrialConfigurationDto>>(this.API + 'multiple',this.freeTrialConfigurationSelections);
   }


    get freeTrialConfigurations(): Array<FreeTrialConfigurationDto> {
        if(this._freeTrialConfigurations == null){
            this._freeTrialConfigurations = new Array<FreeTrialConfigurationDto>();
        }
        return this._freeTrialConfigurations;
     }

    set freeTrialConfigurations(value: Array<FreeTrialConfigurationDto>) {
        this._freeTrialConfigurations = value;
    }

    get selectedFreeTrialConfiguration(): FreeTrialConfigurationDto {
        if(this._selectedFreeTrialConfiguration == null){
            this._selectedFreeTrialConfiguration = new FreeTrialConfigurationDto();
        }
        return this._selectedFreeTrialConfiguration;
    }

    set selectedFreeTrialConfiguration(value: FreeTrialConfigurationDto) {
        this._selectedFreeTrialConfiguration = value;
    }

    get freeTrialConfigurationSelections(): Array<FreeTrialConfigurationDto> {
        if(this._freeTrialConfigurationSelections == null){
            this._freeTrialConfigurationSelections = new Array<FreeTrialConfigurationDto>();
        }
        return this._freeTrialConfigurationSelections;
    }


    set freeTrialConfigurationSelections(value: Array<FreeTrialConfigurationDto>) {
        this._freeTrialConfigurationSelections = value;
    }

    get createFreeTrialConfigurationDialog(): boolean {
        return this._createFreeTrialConfigurationDialog;
    }

    set createFreeTrialConfigurationDialog(value: boolean) {
        this._createFreeTrialConfigurationDialog = value;
    }

    get editFreeTrialConfigurationDialog(): boolean {
        return this._editFreeTrialConfigurationDialog;
    }

    set editFreeTrialConfigurationDialog(value: boolean) {
        this._editFreeTrialConfigurationDialog = value;
    }

    get viewFreeTrialConfigurationDialog(): boolean {
        return this._viewFreeTrialConfigurationDialog;
    }

    set viewFreeTrialConfigurationDialog(value: boolean) {
        this._viewFreeTrialConfigurationDialog = value;
    }

    get search(): FreeTrialConfigurationCriteria {
         if(this._search==null){
            this._search = new FreeTrialConfigurationCriteria();
        }
        return this._search;
    }

    set search(value: FreeTrialConfigurationCriteria) {
        this._search = value;
    }
}
