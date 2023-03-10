import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {FreeTrialStudentWhatsTemplateDto} from '../model/FreeTrialStudentWhatsTemplate.model';
import {FreeTrialStudentWhatsTemplateCriteria} from '../criteria/FreeTrialStudentWhatsTemplateCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class FreeTrialStudentWhatsTemplateService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/freeTrialStudentWhatsTemplate/';
        });
    }
     private _freeTrialStudentWhatsTemplates: Array<FreeTrialStudentWhatsTemplateDto> ;
     private _selectedFreeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateDto;
     private _freeTrialStudentWhatsTemplateSelections: Array<FreeTrialStudentWhatsTemplateDto>;
     private _createFreeTrialStudentWhatsTemplateDialog: boolean;
     private _editFreeTrialStudentWhatsTemplateDialog: boolean;
     private _viewFreeTrialStudentWhatsTemplateDialog: boolean;
     public editFreeTrialStudentWhatsTemplate$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: FreeTrialStudentWhatsTemplateCriteria ;




    public findPaginatedByCriteria(criteria: FreeTrialStudentWhatsTemplateCriteria): Observable<PaginatedList<FreeTrialStudentWhatsTemplateDto>>{
        return this.http.post<PaginatedList<FreeTrialStudentWhatsTemplateDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<FreeTrialStudentWhatsTemplateDto>>(this.API);
    }

    public save(): Observable<FreeTrialStudentWhatsTemplateDto> {
        return this.http.post<FreeTrialStudentWhatsTemplateDto>(this.API, this.selectedFreeTrialStudentWhatsTemplate);
    }

    delete(freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateDto) {
         return this.http.delete<number>(this.API + 'id/' + freeTrialStudentWhatsTemplate.id);
    }


    public edit(): Observable<FreeTrialStudentWhatsTemplateDto> {
        return this.http.put<FreeTrialStudentWhatsTemplateDto>(this.API, this.selectedFreeTrialStudentWhatsTemplate);
    }


     public findByCriteria(freeTrialStudentWhatsTemplate: FreeTrialStudentWhatsTemplateCriteria): Observable<Array<FreeTrialStudentWhatsTemplateDto>>{
           return this.http.post<Array<FreeTrialStudentWhatsTemplateDto>>(this.API + 'find-by-criteria', freeTrialStudentWhatsTemplate);
    }

   public findByIdWithAssociatedList(freeTrialStudentWhatsTemplate:FreeTrialStudentWhatsTemplateDto): Observable<FreeTrialStudentWhatsTemplateDto>{
         return this.http.get<FreeTrialStudentWhatsTemplateDto>(this.API + 'id/' +freeTrialStudentWhatsTemplate.id);
    }

   public deleteMultiple(): Observable<Array<FreeTrialStudentWhatsTemplateDto>>{
        return this.http.post<Array<FreeTrialStudentWhatsTemplateDto>>(this.API + 'multiple',this.freeTrialStudentWhatsTemplateSelections);
   }


    get freeTrialStudentWhatsTemplates(): Array<FreeTrialStudentWhatsTemplateDto> {
        if(this._freeTrialStudentWhatsTemplates == null){
            this._freeTrialStudentWhatsTemplates = new Array<FreeTrialStudentWhatsTemplateDto>();
        }
        return this._freeTrialStudentWhatsTemplates;
     }

    set freeTrialStudentWhatsTemplates(value: Array<FreeTrialStudentWhatsTemplateDto>) {
        this._freeTrialStudentWhatsTemplates = value;
    }

    get selectedFreeTrialStudentWhatsTemplate(): FreeTrialStudentWhatsTemplateDto {
        if(this._selectedFreeTrialStudentWhatsTemplate == null){
            this._selectedFreeTrialStudentWhatsTemplate = new FreeTrialStudentWhatsTemplateDto();
        }
        return this._selectedFreeTrialStudentWhatsTemplate;
    }

    set selectedFreeTrialStudentWhatsTemplate(value: FreeTrialStudentWhatsTemplateDto) {
        this._selectedFreeTrialStudentWhatsTemplate = value;
    }

    get freeTrialStudentWhatsTemplateSelections(): Array<FreeTrialStudentWhatsTemplateDto> {
        if(this._freeTrialStudentWhatsTemplateSelections == null){
            this._freeTrialStudentWhatsTemplateSelections = new Array<FreeTrialStudentWhatsTemplateDto>();
        }
        return this._freeTrialStudentWhatsTemplateSelections;
    }


    set freeTrialStudentWhatsTemplateSelections(value: Array<FreeTrialStudentWhatsTemplateDto>) {
        this._freeTrialStudentWhatsTemplateSelections = value;
    }

    get createFreeTrialStudentWhatsTemplateDialog(): boolean {
        return this._createFreeTrialStudentWhatsTemplateDialog;
    }

    set createFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this._createFreeTrialStudentWhatsTemplateDialog = value;
    }

    get editFreeTrialStudentWhatsTemplateDialog(): boolean {
        return this._editFreeTrialStudentWhatsTemplateDialog;
    }

    set editFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this._editFreeTrialStudentWhatsTemplateDialog = value;
    }

    get viewFreeTrialStudentWhatsTemplateDialog(): boolean {
        return this._viewFreeTrialStudentWhatsTemplateDialog;
    }

    set viewFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this._viewFreeTrialStudentWhatsTemplateDialog = value;
    }

    get search(): FreeTrialStudentWhatsTemplateCriteria {
         if(this._search==null){
            this._search = new FreeTrialStudentWhatsTemplateCriteria();
        }
        return this._search;
    }

    set search(value: FreeTrialStudentWhatsTemplateCriteria) {
        this._search = value;
    }
}
