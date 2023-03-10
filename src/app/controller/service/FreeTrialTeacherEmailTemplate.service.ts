import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {FreeTrialTeacherEmailTemplateDto} from '../model/FreeTrialTeacherEmailTemplate.model';
import {FreeTrialTeacherEmailTemplateCriteria} from '../criteria/FreeTrialTeacherEmailTemplateCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class FreeTrialTeacherEmailTemplateService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/freeTrialTeacherEmailTemplate/';
        });
    }
     private _freeTrialTeacherEmailTemplates: Array<FreeTrialTeacherEmailTemplateDto> ;
     private _selectedFreeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateDto;
     private _freeTrialTeacherEmailTemplateSelections: Array<FreeTrialTeacherEmailTemplateDto>;
     private _createFreeTrialTeacherEmailTemplateDialog: boolean;
     private _editFreeTrialTeacherEmailTemplateDialog: boolean;
     private _viewFreeTrialTeacherEmailTemplateDialog: boolean;
     public editFreeTrialTeacherEmailTemplate$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: FreeTrialTeacherEmailTemplateCriteria ;




    public findPaginatedByCriteria(criteria: FreeTrialTeacherEmailTemplateCriteria): Observable<PaginatedList<FreeTrialTeacherEmailTemplateDto>>{
        return this.http.post<PaginatedList<FreeTrialTeacherEmailTemplateDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<FreeTrialTeacherEmailTemplateDto>>(this.API);
    }

    public save(): Observable<FreeTrialTeacherEmailTemplateDto> {
        return this.http.post<FreeTrialTeacherEmailTemplateDto>(this.API, this.selectedFreeTrialTeacherEmailTemplate);
    }

    delete(freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateDto) {
         return this.http.delete<number>(this.API + 'id/' + freeTrialTeacherEmailTemplate.id);
    }


    public edit(): Observable<FreeTrialTeacherEmailTemplateDto> {
        return this.http.put<FreeTrialTeacherEmailTemplateDto>(this.API, this.selectedFreeTrialTeacherEmailTemplate);
    }


     public findByCriteria(freeTrialTeacherEmailTemplate: FreeTrialTeacherEmailTemplateCriteria): Observable<Array<FreeTrialTeacherEmailTemplateDto>>{
           return this.http.post<Array<FreeTrialTeacherEmailTemplateDto>>(this.API + 'find-by-criteria', freeTrialTeacherEmailTemplate);
    }

   public findByIdWithAssociatedList(freeTrialTeacherEmailTemplate:FreeTrialTeacherEmailTemplateDto): Observable<FreeTrialTeacherEmailTemplateDto>{
         return this.http.get<FreeTrialTeacherEmailTemplateDto>(this.API + 'id/' +freeTrialTeacherEmailTemplate.id);
    }

   public deleteMultiple(): Observable<Array<FreeTrialTeacherEmailTemplateDto>>{
        return this.http.post<Array<FreeTrialTeacherEmailTemplateDto>>(this.API + 'multiple',this.freeTrialTeacherEmailTemplateSelections);
   }


    get freeTrialTeacherEmailTemplates(): Array<FreeTrialTeacherEmailTemplateDto> {
        if(this._freeTrialTeacherEmailTemplates == null){
            this._freeTrialTeacherEmailTemplates = new Array<FreeTrialTeacherEmailTemplateDto>();
        }
        return this._freeTrialTeacherEmailTemplates;
     }

    set freeTrialTeacherEmailTemplates(value: Array<FreeTrialTeacherEmailTemplateDto>) {
        this._freeTrialTeacherEmailTemplates = value;
    }

    get selectedFreeTrialTeacherEmailTemplate(): FreeTrialTeacherEmailTemplateDto {
        if(this._selectedFreeTrialTeacherEmailTemplate == null){
            this._selectedFreeTrialTeacherEmailTemplate = new FreeTrialTeacherEmailTemplateDto();
        }
        return this._selectedFreeTrialTeacherEmailTemplate;
    }

    set selectedFreeTrialTeacherEmailTemplate(value: FreeTrialTeacherEmailTemplateDto) {
        this._selectedFreeTrialTeacherEmailTemplate = value;
    }

    get freeTrialTeacherEmailTemplateSelections(): Array<FreeTrialTeacherEmailTemplateDto> {
        if(this._freeTrialTeacherEmailTemplateSelections == null){
            this._freeTrialTeacherEmailTemplateSelections = new Array<FreeTrialTeacherEmailTemplateDto>();
        }
        return this._freeTrialTeacherEmailTemplateSelections;
    }


    set freeTrialTeacherEmailTemplateSelections(value: Array<FreeTrialTeacherEmailTemplateDto>) {
        this._freeTrialTeacherEmailTemplateSelections = value;
    }

    get createFreeTrialTeacherEmailTemplateDialog(): boolean {
        return this._createFreeTrialTeacherEmailTemplateDialog;
    }

    set createFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this._createFreeTrialTeacherEmailTemplateDialog = value;
    }

    get editFreeTrialTeacherEmailTemplateDialog(): boolean {
        return this._editFreeTrialTeacherEmailTemplateDialog;
    }

    set editFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this._editFreeTrialTeacherEmailTemplateDialog = value;
    }

    get viewFreeTrialTeacherEmailTemplateDialog(): boolean {
        return this._viewFreeTrialTeacherEmailTemplateDialog;
    }

    set viewFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this._viewFreeTrialTeacherEmailTemplateDialog = value;
    }

    get search(): FreeTrialTeacherEmailTemplateCriteria {
         if(this._search==null){
            this._search = new FreeTrialTeacherEmailTemplateCriteria();
        }
        return this._search;
    }

    set search(value: FreeTrialTeacherEmailTemplateCriteria) {
        this._search = value;
    }
}
