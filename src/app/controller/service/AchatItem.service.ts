import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {AchatItemDto} from '../model/AchatItem.model';
import {AchatDto} from '../model/Achat.model';
import {ProduitDto} from '../model/Produit.model';


@Injectable({
  providedIn: 'root'
})
export class AchatItemService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/achatItem/';
        });
    }
     private _achatItems: Array<AchatItemDto> ;
     private _selectedAchatItem: AchatItemDto;
     private _achatItemSelections: Array<AchatItemDto>;
     private _createAchatItemDialog: boolean;
     private _editAchatItemDialog: boolean;
     private _viewAchatItemDialog: boolean;
     public editAchatItem$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchAchatItem: AchatItemDto ;




    public findAll(){
     return this.http.get<Array<AchatItemDto>>(this.API);
    }

    public save(): Observable<AchatItemDto> {
        return this.http.post<AchatItemDto>(this.API, this.selectedAchatItem);
    }

    delete(achatItem: AchatItemDto) {
         return this.http.delete<number>(this.API + 'id/' + achatItem.id);
    }


    public edit(): Observable<AchatItemDto> {
        return this.http.put<AchatItemDto>(this.API, this.selectedAchatItem);
    }


     public findByCriteria(achatItem:AchatItemDto): Observable<Array<AchatItemDto>>{
           return this.http.post<Array<AchatItemDto>>(this.API + 'search', achatItem);
    }

   public findByIdWithAssociatedList(achatItem:AchatItemDto):Observable<AchatItemDto>{
         return this.http.get<AchatItemDto>(this.API + 'detail/id/' +achatItem.id);
    }

    // getters and setters


    get achatItems(): Array<AchatItemDto> {
        if(this._achatItems == null){
            this._achatItems = new Array<AchatItemDto>();
        }
        return this._achatItems;
     }

    set achatItems(value: Array<AchatItemDto>) {
        this._achatItems = value;
    }

    get selectedAchatItem(): AchatItemDto {
        if(this._selectedAchatItem == null){
            this._selectedAchatItem = new AchatItemDto();
        }
        return this._selectedAchatItem;
    }

    set selectedAchatItem(value: AchatItemDto) {
        this._selectedAchatItem = value;
    }

    get achatItemSelections(): Array<AchatItemDto> {
        if(this._achatItemSelections == null){
            this._achatItemSelections = new Array<AchatItemDto>();
        }
        return this._achatItemSelections;
    }


    set achatItemSelections(value: Array<AchatItemDto>) {
        this._achatItemSelections = value;
    }

    get createAchatItemDialog(): boolean {
        return this._createAchatItemDialog;
    }

    set createAchatItemDialog(value: boolean) {
        this._createAchatItemDialog = value;
    }

    get editAchatItemDialog(): boolean {
        return this._editAchatItemDialog;
    }

    set editAchatItemDialog(value: boolean) {
        this._editAchatItemDialog = value;
    }

    get viewAchatItemDialog(): boolean {
        return this._viewAchatItemDialog;
    }

    set viewAchatItemDialog(value: boolean) {
        this._viewAchatItemDialog = value;
    }

    get searchAchatItem(): AchatItemDto {
         if(this._searchAchatItem==null){
            this._searchAchatItem=new AchatItemDto();
        }
        return this._searchAchatItem;
    }

    set searchAchatItem(value: AchatItemDto) {
        this._searchAchatItem = value;
    }
}
