import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {CategorieProduitDto} from '../model/CategorieProduit.model';


@Injectable({
  providedIn: 'root'
})
export class CategorieProduitService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categorieProduit/';
        });
    }
     private _categorieProduits: Array<CategorieProduitDto> ;
     private _selectedCategorieProduit: CategorieProduitDto;
     private _categorieProduitSelections: Array<CategorieProduitDto>;
     private _createCategorieProduitDialog: boolean;
     private _editCategorieProduitDialog: boolean;
     private _viewCategorieProduitDialog: boolean;
     public editCategorieProduit$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategorieProduit: CategorieProduitDto ;




    public findAll(){
     return this.http.get<Array<CategorieProduitDto>>(this.API);
    }

    public save(): Observable<CategorieProduitDto> {
        return this.http.post<CategorieProduitDto>(this.API, this.selectedCategorieProduit);
    }

    delete(categorieProduit: CategorieProduitDto) {
         return this.http.delete<number>(this.API + 'id/' + categorieProduit.id);
    }


    public edit(): Observable<CategorieProduitDto> {
        return this.http.put<CategorieProduitDto>(this.API, this.selectedCategorieProduit);
    }


     public findByCriteria(categorieProduit:CategorieProduitDto): Observable<Array<CategorieProduitDto>>{
           return this.http.post<Array<CategorieProduitDto>>(this.API + 'search', categorieProduit);
    }

   public findByIdWithAssociatedList(categorieProduit:CategorieProduitDto):Observable<CategorieProduitDto>{
         return this.http.get<CategorieProduitDto>(this.API + 'detail/id/' +categorieProduit.id);
    }

    // getters and setters


    get categorieProduits(): Array<CategorieProduitDto> {
        if(this._categorieProduits == null){
            this._categorieProduits = new Array<CategorieProduitDto>();
        }
        return this._categorieProduits;
     }

    set categorieProduits(value: Array<CategorieProduitDto>) {
        this._categorieProduits = value;
    }

    get selectedCategorieProduit(): CategorieProduitDto {
        if(this._selectedCategorieProduit == null){
            this._selectedCategorieProduit = new CategorieProduitDto();
        }
        return this._selectedCategorieProduit;
    }

    set selectedCategorieProduit(value: CategorieProduitDto) {
        this._selectedCategorieProduit = value;
    }

    get categorieProduitSelections(): Array<CategorieProduitDto> {
        if(this._categorieProduitSelections == null){
            this._categorieProduitSelections = new Array<CategorieProduitDto>();
        }
        return this._categorieProduitSelections;
    }


    set categorieProduitSelections(value: Array<CategorieProduitDto>) {
        this._categorieProduitSelections = value;
    }

    get createCategorieProduitDialog(): boolean {
        return this._createCategorieProduitDialog;
    }

    set createCategorieProduitDialog(value: boolean) {
        this._createCategorieProduitDialog = value;
    }

    get editCategorieProduitDialog(): boolean {
        return this._editCategorieProduitDialog;
    }

    set editCategorieProduitDialog(value: boolean) {
        this._editCategorieProduitDialog = value;
    }

    get viewCategorieProduitDialog(): boolean {
        return this._viewCategorieProduitDialog;
    }

    set viewCategorieProduitDialog(value: boolean) {
        this._viewCategorieProduitDialog = value;
    }

    get searchCategorieProduit(): CategorieProduitDto {
         if(this._searchCategorieProduit==null){
            this._searchCategorieProduit=new CategorieProduitDto();
        }
        return this._searchCategorieProduit;
    }

    set searchCategorieProduit(value: CategorieProduitDto) {
        this._searchCategorieProduit = value;
    }
}
