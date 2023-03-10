import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {PaiementAchatDto} from '../model/PaiementAchat.model';
import {AchatDto} from '../model/Achat.model';


@Injectable({
  providedIn: 'root'
})
export class PaiementAchatService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paiementAchat/';
        });
    }
     private _paiementAchats: Array<PaiementAchatDto> ;
     private _selectedPaiementAchat: PaiementAchatDto;
     private _paiementAchatSelections: Array<PaiementAchatDto>;
     private _createPaiementAchatDialog: boolean;
     private _editPaiementAchatDialog: boolean;
     private _viewPaiementAchatDialog: boolean;
     public editPaiementAchat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaiementAchat: PaiementAchatDto ;




    public findAll(){
     return this.http.get<Array<PaiementAchatDto>>(this.API);
    }

    public save(): Observable<PaiementAchatDto> {
        return this.http.post<PaiementAchatDto>(this.API, this.selectedPaiementAchat);
    }

    delete(paiementAchat: PaiementAchatDto) {
         return this.http.delete<number>(this.API + 'id/' + paiementAchat.id);
    }


    public edit(): Observable<PaiementAchatDto> {
        return this.http.put<PaiementAchatDto>(this.API, this.selectedPaiementAchat);
    }


     public findByCriteria(paiementAchat:PaiementAchatDto): Observable<Array<PaiementAchatDto>>{
           return this.http.post<Array<PaiementAchatDto>>(this.API + 'search', paiementAchat);
    }

   public findByIdWithAssociatedList(paiementAchat:PaiementAchatDto):Observable<PaiementAchatDto>{
         return this.http.get<PaiementAchatDto>(this.API + 'detail/id/' +paiementAchat.id);
    }

    // getters and setters


    get paiementAchats(): Array<PaiementAchatDto> {
        if(this._paiementAchats == null){
            this._paiementAchats = new Array<PaiementAchatDto>();
        }
        return this._paiementAchats;
     }

    set paiementAchats(value: Array<PaiementAchatDto>) {
        this._paiementAchats = value;
    }

    get selectedPaiementAchat(): PaiementAchatDto {
        if(this._selectedPaiementAchat == null){
            this._selectedPaiementAchat = new PaiementAchatDto();
        }
        return this._selectedPaiementAchat;
    }

    set selectedPaiementAchat(value: PaiementAchatDto) {
        this._selectedPaiementAchat = value;
    }

    get paiementAchatSelections(): Array<PaiementAchatDto> {
        if(this._paiementAchatSelections == null){
            this._paiementAchatSelections = new Array<PaiementAchatDto>();
        }
        return this._paiementAchatSelections;
    }


    set paiementAchatSelections(value: Array<PaiementAchatDto>) {
        this._paiementAchatSelections = value;
    }

    get createPaiementAchatDialog(): boolean {
        return this._createPaiementAchatDialog;
    }

    set createPaiementAchatDialog(value: boolean) {
        this._createPaiementAchatDialog = value;
    }

    get editPaiementAchatDialog(): boolean {
        return this._editPaiementAchatDialog;
    }

    set editPaiementAchatDialog(value: boolean) {
        this._editPaiementAchatDialog = value;
    }

    get viewPaiementAchatDialog(): boolean {
        return this._viewPaiementAchatDialog;
    }

    set viewPaiementAchatDialog(value: boolean) {
        this._viewPaiementAchatDialog = value;
    }

    get searchPaiementAchat(): PaiementAchatDto {
         if(this._searchPaiementAchat==null){
            this._searchPaiementAchat=new PaiementAchatDto();
        }
        return this._searchPaiementAchat;
    }

    set searchPaiementAchat(value: PaiementAchatDto) {
        this._searchPaiementAchat = value;
    }
}
