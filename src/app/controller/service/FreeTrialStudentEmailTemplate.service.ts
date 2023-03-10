import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {FreeTrialStudentEmailTemplateDto} from '../model/FreeTrialStudentEmailTemplate.model';
import {FreeTrialStudentEmailTemplateCriteria} from '../criteria/FreeTrialStudentEmailTemplateCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class FreeTrialStudentEmailTemplateService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/freeTrialStudentEmailTemplate/';
        });
    }
     private _freeTrialStudentEmailTemplates: Array<FreeTrialStudentEmailTemplateDto> ;
     private _selectedFreeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateDto;
     private _freeTrialStudentEmailTemplateSelections: Array<FreeTrialStudentEmailTemplateDto>;
     private _createFreeTrialStudentEmailTemplateDialog: boolean;
     private _editFreeTrialStudentEmailTemplateDialog: boolean;
     private _viewFreeTrialStudentEmailTemplateDialog: boolean;
     public editFreeTrialStudentEmailTemplate$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: FreeTrialStudentEmailTemplateCriteria ;




    public findPaginatedByCriteria(criteria: FreeTrialStudentEmailTemplateCriteria): Observable<PaginatedList<FreeTrialStudentEmailTemplateDto>>{
        return this.http.post<PaginatedList<FreeTrialStudentEmailTemplateDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<FreeTrialStudentEmailTemplateDto>>(this.API);
    }

    public save(): Observable<FreeTrialStudentEmailTemplateDto> {
        return this.http.post<FreeTrialStudentEmailTemplateDto>(this.API, this.selectedFreeTrialStudentEmailTemplate);
    }

    delete(freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateDto) {
         return this.http.delete<number>(this.API + 'id/' + freeTrialStudentEmailTemplate.id);
    }


    public edit(): Observable<FreeTrialStudentEmailTemplateDto> {
        return this.http.put<FreeTrialStudentEmailTemplateDto>(this.API, this.selectedFreeTrialStudentEmailTemplate);
    }


     public findByCriteria(freeTrialStudentEmailTemplate: FreeTrialStudentEmailTemplateCriteria): Observable<Array<FreeTrialStudentEmailTemplateDto>>{
           return this.http.post<Array<FreeTrialStudentEmailTemplateDto>>(this.API + 'find-by-criteria', freeTrialStudentEmailTemplate);
    }

   public findByIdWithAssociatedList(freeTrialStudentEmailTemplate:FreeTrialStudentEmailTemplateDto): Observable<FreeTrialStudentEmailTemplateDto>{
         return this.http.get<FreeTrialStudentEmailTemplateDto>(this.API + 'id/' +freeTrialStudentEmailTemplate.id);
    }

   public deleteMultiple(): Observable<Array<FreeTrialStudentEmailTemplateDto>>{
        return this.http.post<Array<FreeTrialStudentEmailTemplateDto>>(this.API + 'multiple',this.freeTrialStudentEmailTemplateSelections);
   }


    get freeTrialStudentEmailTemplates(): Array<FreeTrialStudentEmailTemplateDto> {
        if(this._freeTrialStudentEmailTemplates == null){
            this._freeTrialStudentEmailTemplates = new Array<FreeTrialStudentEmailTemplateDto>();
        }
        return this._freeTrialStudentEmailTemplates;
     }

    set freeTrialStudentEmailTemplates(value: Array<FreeTrialStudentEmailTemplateDto>) {
        this._freeTrialStudentEmailTemplates = value;
    }

    get selectedFreeTrialStudentEmailTemplate(): FreeTrialStudentEmailTemplateDto {
        if(this._selectedFreeTrialStudentEmailTemplate == null){
            this._selectedFreeTrialStudentEmailTemplate = new FreeTrialStudentEmailTemplateDto();
        }
        return this._selectedFreeTrialStudentEmailTemplate;
    }

    set selectedFreeTrialStudentEmailTemplate(value: FreeTrialStudentEmailTemplateDto) {
        this._selectedFreeTrialStudentEmailTemplate = value;
    }

    get freeTrialStudentEmailTemplateSelections(): Array<FreeTrialStudentEmailTemplateDto> {
        if(this._freeTrialStudentEmailTemplateSelections == null){
            this._freeTrialStudentEmailTemplateSelections = new Array<FreeTrialStudentEmailTemplateDto>();
        }
        return this._freeTrialStudentEmailTemplateSelections;
    }


    set freeTrialStudentEmailTemplateSelections(value: Array<FreeTrialStudentEmailTemplateDto>) {
        this._freeTrialStudentEmailTemplateSelections = value;
    }

    get createFreeTrialStudentEmailTemplateDialog(): boolean {
        return this._createFreeTrialStudentEmailTemplateDialog;
    }

    set createFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this._createFreeTrialStudentEmailTemplateDialog = value;
    }

    get editFreeTrialStudentEmailTemplateDialog(): boolean {
        return this._editFreeTrialStudentEmailTemplateDialog;
    }

    set editFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this._editFreeTrialStudentEmailTemplateDialog = value;
    }

    get viewFreeTrialStudentEmailTemplateDialog(): boolean {
        return this._viewFreeTrialStudentEmailTemplateDialog;
    }

    set viewFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this._viewFreeTrialStudentEmailTemplateDialog = value;
    }

    get search(): FreeTrialStudentEmailTemplateCriteria {
         if(this._search==null){
            this._search = new FreeTrialStudentEmailTemplateCriteria();
        }
        return this._search;
    }

    set search(value: FreeTrialStudentEmailTemplateCriteria) {
        this._search = value;
    }
}
