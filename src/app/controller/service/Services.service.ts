import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {ServicesDto} from '../model/Services.model';
import {ServicesCriteria} from '../criteria/ServicesCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/services/';
        });
    }
     private _servicess: Array<ServicesDto> ;
     private _selectedServices: ServicesDto;
     private _servicesSelections: Array<ServicesDto>;
     private _createServicesDialog: boolean;
     private _editServicesDialog: boolean;
     private _viewServicesDialog: boolean;
     public editServices$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: ServicesCriteria ;




    public findPaginatedByCriteria(criteria: ServicesCriteria): Observable<PaginatedList<ServicesDto>>{
        return this.http.post<PaginatedList<ServicesDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<ServicesDto>>(this.API);
    }

    public save(): Observable<ServicesDto> {
        return this.http.post<ServicesDto>(this.API, this.selectedServices);
    }

    delete(services: ServicesDto) {
         return this.http.delete<number>(this.API + 'id/' + services.id);
    }


    public edit(): Observable<ServicesDto> {
        return this.http.put<ServicesDto>(this.API, this.selectedServices);
    }


     public findByCriteria(services: ServicesCriteria): Observable<Array<ServicesDto>>{
           return this.http.post<Array<ServicesDto>>(this.API + 'find-by-criteria', services);
    }

   public findByIdWithAssociatedList(services:ServicesDto): Observable<ServicesDto>{
         return this.http.get<ServicesDto>(this.API + 'id/' +services.id);
    }

   public deleteMultiple(): Observable<Array<ServicesDto>>{
        return this.http.post<Array<ServicesDto>>(this.API + 'multiple',this.servicesSelections);
   }


    get servicess(): Array<ServicesDto> {
        if(this._servicess == null){
            this._servicess = new Array<ServicesDto>();
        }
        return this._servicess;
     }

    set servicess(value: Array<ServicesDto>) {
        this._servicess = value;
    }

    get selectedServices(): ServicesDto {
        if(this._selectedServices == null){
            this._selectedServices = new ServicesDto();
        }
        return this._selectedServices;
    }

    set selectedServices(value: ServicesDto) {
        this._selectedServices = value;
    }

    get servicesSelections(): Array<ServicesDto> {
        if(this._servicesSelections == null){
            this._servicesSelections = new Array<ServicesDto>();
        }
        return this._servicesSelections;
    }


    set servicesSelections(value: Array<ServicesDto>) {
        this._servicesSelections = value;
    }

    get createServicesDialog(): boolean {
        return this._createServicesDialog;
    }

    set createServicesDialog(value: boolean) {
        this._createServicesDialog = value;
    }

    get editServicesDialog(): boolean {
        return this._editServicesDialog;
    }

    set editServicesDialog(value: boolean) {
        this._editServicesDialog = value;
    }

    get viewServicesDialog(): boolean {
        return this._viewServicesDialog;
    }

    set viewServicesDialog(value: boolean) {
        this._viewServicesDialog = value;
    }

    get search(): ServicesCriteria {
         if(this._search==null){
            this._search = new ServicesCriteria();
        }
        return this._search;
    }

    set search(value: ServicesCriteria) {
        this._search = value;
    }
}
