import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {ClientDto} from '../model/Client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/client/';
        });
    }
     private _clients: Array<ClientDto> ;
     private _selectedClient: ClientDto;
     private _clientSelections: Array<ClientDto>;
     private _createClientDialog: boolean;
     private _editClientDialog: boolean;
     private _viewClientDialog: boolean;
     public editClient$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchClient: ClientDto ;




    public findAll(){
     return this.http.get<Array<ClientDto>>(this.API);
    }

    public save(): Observable<ClientDto> {
        return this.http.post<ClientDto>(this.API, this.selectedClient);
    }

    delete(client: ClientDto) {
         return this.http.delete<number>(this.API + 'id/' + client.id);
    }


    public edit(): Observable<ClientDto> {
        return this.http.put<ClientDto>(this.API, this.selectedClient);
    }


     public findByCriteria(client:ClientDto): Observable<Array<ClientDto>>{
           return this.http.post<Array<ClientDto>>(this.API + 'search', client);
    }

   public findByIdWithAssociatedList(client:ClientDto):Observable<ClientDto>{
         return this.http.get<ClientDto>(this.API + 'detail/id/' +client.id);
    }

    // getters and setters


    get clients(): Array<ClientDto> {
        if(this._clients == null){
            this._clients = new Array<ClientDto>();
        }
        return this._clients;
     }

    set clients(value: Array<ClientDto>) {
        this._clients = value;
    }

    get selectedClient(): ClientDto {
        if(this._selectedClient == null){
            this._selectedClient = new ClientDto();
        }
        return this._selectedClient;
    }

    set selectedClient(value: ClientDto) {
        this._selectedClient = value;
    }

    get clientSelections(): Array<ClientDto> {
        if(this._clientSelections == null){
            this._clientSelections = new Array<ClientDto>();
        }
        return this._clientSelections;
    }


    set clientSelections(value: Array<ClientDto>) {
        this._clientSelections = value;
    }

    get createClientDialog(): boolean {
        return this._createClientDialog;
    }

    set createClientDialog(value: boolean) {
        this._createClientDialog = value;
    }

    get editClientDialog(): boolean {
        return this._editClientDialog;
    }

    set editClientDialog(value: boolean) {
        this._editClientDialog = value;
    }

    get viewClientDialog(): boolean {
        return this._viewClientDialog;
    }

    set viewClientDialog(value: boolean) {
        this._viewClientDialog = value;
    }

    get searchClient(): ClientDto {
         if(this._searchClient==null){
            this._searchClient=new ClientDto();
        }
        return this._searchClient;
    }

    set searchClient(value: ClientDto) {
        this._searchClient = value;
    }
}
