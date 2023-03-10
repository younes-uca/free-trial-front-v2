import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {FreeTrialTeacherWhatsTemplateDto} from '../model/FreeTrialTeacherWhatsTemplate.model';
import {FreeTrialTeacherWhatsTemplateCriteria} from '../criteria/FreeTrialTeacherWhatsTemplateCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class FreeTrialTeacherWhatsTemplateService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/freeTrialTeacherWhatsTemplate/';
        });
    }
     private _freeTrialTeacherWhatsTemplates: Array<FreeTrialTeacherWhatsTemplateDto> ;
     private _selectedFreeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateDto;
     private _freeTrialTeacherWhatsTemplateSelections: Array<FreeTrialTeacherWhatsTemplateDto>;
     private _createFreeTrialTeacherWhatsTemplateDialog: boolean;
     private _editFreeTrialTeacherWhatsTemplateDialog: boolean;
     private _viewFreeTrialTeacherWhatsTemplateDialog: boolean;
     public editFreeTrialTeacherWhatsTemplate$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: FreeTrialTeacherWhatsTemplateCriteria ;




    public findPaginatedByCriteria(criteria: FreeTrialTeacherWhatsTemplateCriteria): Observable<PaginatedList<FreeTrialTeacherWhatsTemplateDto>>{
        return this.http.post<PaginatedList<FreeTrialTeacherWhatsTemplateDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<FreeTrialTeacherWhatsTemplateDto>>(this.API);
    }

    public save(): Observable<FreeTrialTeacherWhatsTemplateDto> {
        return this.http.post<FreeTrialTeacherWhatsTemplateDto>(this.API, this.selectedFreeTrialTeacherWhatsTemplate);
    }

    delete(freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateDto) {
         return this.http.delete<number>(this.API + 'id/' + freeTrialTeacherWhatsTemplate.id);
    }


    public edit(): Observable<FreeTrialTeacherWhatsTemplateDto> {
        return this.http.put<FreeTrialTeacherWhatsTemplateDto>(this.API, this.selectedFreeTrialTeacherWhatsTemplate);
    }


     public findByCriteria(freeTrialTeacherWhatsTemplate: FreeTrialTeacherWhatsTemplateCriteria): Observable<Array<FreeTrialTeacherWhatsTemplateDto>>{
           return this.http.post<Array<FreeTrialTeacherWhatsTemplateDto>>(this.API + 'find-by-criteria', freeTrialTeacherWhatsTemplate);
    }

   public findByIdWithAssociatedList(freeTrialTeacherWhatsTemplate:FreeTrialTeacherWhatsTemplateDto): Observable<FreeTrialTeacherWhatsTemplateDto>{
         return this.http.get<FreeTrialTeacherWhatsTemplateDto>(this.API + 'id/' +freeTrialTeacherWhatsTemplate.id);
    }

   public deleteMultiple(): Observable<Array<FreeTrialTeacherWhatsTemplateDto>>{
        return this.http.post<Array<FreeTrialTeacherWhatsTemplateDto>>(this.API + 'multiple',this.freeTrialTeacherWhatsTemplateSelections);
   }


    get freeTrialTeacherWhatsTemplates(): Array<FreeTrialTeacherWhatsTemplateDto> {
        if(this._freeTrialTeacherWhatsTemplates == null){
            this._freeTrialTeacherWhatsTemplates = new Array<FreeTrialTeacherWhatsTemplateDto>();
        }
        return this._freeTrialTeacherWhatsTemplates;
     }

    set freeTrialTeacherWhatsTemplates(value: Array<FreeTrialTeacherWhatsTemplateDto>) {
        this._freeTrialTeacherWhatsTemplates = value;
    }

    get selectedFreeTrialTeacherWhatsTemplate(): FreeTrialTeacherWhatsTemplateDto {
        if(this._selectedFreeTrialTeacherWhatsTemplate == null){
            this._selectedFreeTrialTeacherWhatsTemplate = new FreeTrialTeacherWhatsTemplateDto();
        }
        return this._selectedFreeTrialTeacherWhatsTemplate;
    }

    set selectedFreeTrialTeacherWhatsTemplate(value: FreeTrialTeacherWhatsTemplateDto) {
        this._selectedFreeTrialTeacherWhatsTemplate = value;
    }

    get freeTrialTeacherWhatsTemplateSelections(): Array<FreeTrialTeacherWhatsTemplateDto> {
        if(this._freeTrialTeacherWhatsTemplateSelections == null){
            this._freeTrialTeacherWhatsTemplateSelections = new Array<FreeTrialTeacherWhatsTemplateDto>();
        }
        return this._freeTrialTeacherWhatsTemplateSelections;
    }


    set freeTrialTeacherWhatsTemplateSelections(value: Array<FreeTrialTeacherWhatsTemplateDto>) {
        this._freeTrialTeacherWhatsTemplateSelections = value;
    }

    get createFreeTrialTeacherWhatsTemplateDialog(): boolean {
        return this._createFreeTrialTeacherWhatsTemplateDialog;
    }

    set createFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this._createFreeTrialTeacherWhatsTemplateDialog = value;
    }

    get editFreeTrialTeacherWhatsTemplateDialog(): boolean {
        return this._editFreeTrialTeacherWhatsTemplateDialog;
    }

    set editFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this._editFreeTrialTeacherWhatsTemplateDialog = value;
    }

    get viewFreeTrialTeacherWhatsTemplateDialog(): boolean {
        return this._viewFreeTrialTeacherWhatsTemplateDialog;
    }

    set viewFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this._viewFreeTrialTeacherWhatsTemplateDialog = value;
    }

    get search(): FreeTrialTeacherWhatsTemplateCriteria {
         if(this._search==null){
            this._search = new FreeTrialTeacherWhatsTemplateCriteria();
        }
        return this._search;
    }

    set search(value: FreeTrialTeacherWhatsTemplateCriteria) {
        this._search = value;
    }
}
