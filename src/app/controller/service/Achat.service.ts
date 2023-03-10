import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {AchatDto} from '../model/Achat.model';
import {AchatItemDto} from '../model/AchatItem.model';
import {PaiementAchatDto} from '../model/PaiementAchat.model';
import {ClientDto} from '../model/Client.model';


@Injectable({
  providedIn: 'root'
})
export class AchatService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/achat/';
        });
    }
     private _achats: Array<AchatDto> ;
     private _selectedAchat: AchatDto;
     private _achatSelections: Array<AchatDto>;
     private _createAchatDialog: boolean;
     private _editAchatDialog: boolean;
     private _viewAchatDialog: boolean;
     public editAchat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchAchat: AchatDto ;




    public findAll(){
     return this.http.get<Array<AchatDto>>(this.API);
    }

    public save(): Observable<AchatDto> {
        return this.http.post<AchatDto>(this.API, this.selectedAchat);
    }

    delete(achat: AchatDto) {
         return this.http.delete<number>(this.API + 'id/' + achat.id);
    }


    public edit(): Observable<AchatDto> {
        return this.http.put<AchatDto>(this.API, this.selectedAchat);
    }


     public findByCriteria(achat:AchatDto): Observable<Array<AchatDto>>{
           return this.http.post<Array<AchatDto>>(this.API + 'search', achat);
    }

   public findByIdWithAssociatedList(achat:AchatDto):Observable<AchatDto>{
         return this.http.get<AchatDto>(this.API + 'detail/id/' +achat.id);
    }

    // getters and setters


    get achats(): Array<AchatDto> {
        if(this._achats == null){
            this._achats = new Array<AchatDto>();
        }
        return this._achats;
     }

    set achats(value: Array<AchatDto>) {
        this._achats = value;
    }

    get selectedAchat(): AchatDto {
        if(this._selectedAchat == null){
            this._selectedAchat = new AchatDto();
        }
        return this._selectedAchat;
    }

    set selectedAchat(value: AchatDto) {
        this._selectedAchat = value;
    }

    get achatSelections(): Array<AchatDto> {
        if(this._achatSelections == null){
            this._achatSelections = new Array<AchatDto>();
        }
        return this._achatSelections;
    }


    set achatSelections(value: Array<AchatDto>) {
        this._achatSelections = value;
    }

    get createAchatDialog(): boolean {
        return this._createAchatDialog;
    }

    set createAchatDialog(value: boolean) {
        this._createAchatDialog = value;
    }

    get editAchatDialog(): boolean {
        return this._editAchatDialog;
    }

    set editAchatDialog(value: boolean) {
        this._editAchatDialog = value;
    }

    get viewAchatDialog(): boolean {
        return this._viewAchatDialog;
    }

    set viewAchatDialog(value: boolean) {
        this._viewAchatDialog = value;
    }

    get searchAchat(): AchatDto {
         if(this._searchAchat==null){
            this._searchAchat=new AchatDto();
        }
        return this._searchAchat;
    }

    set searchAchat(value: AchatDto) {
        this._searchAchat = value;
    }
}
