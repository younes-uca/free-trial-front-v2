import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {ProduitDto} from '../model/Produit.model';
import {CategorieProduitDto} from '../model/CategorieProduit.model';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/produit/';
        });
    }
     private _produits: Array<ProduitDto> ;
     private _selectedProduit: ProduitDto;
     private _produitSelections: Array<ProduitDto>;
     private _createProduitDialog: boolean;
     private _editProduitDialog: boolean;
     private _viewProduitDialog: boolean;
     public editProduit$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProduit: ProduitDto ;




    public findAll(){
     return this.http.get<Array<ProduitDto>>(this.API);
    }

    public save(): Observable<ProduitDto> {
        return this.http.post<ProduitDto>(this.API, this.selectedProduit);
    }

    delete(produit: ProduitDto) {
         return this.http.delete<number>(this.API + 'id/' + produit.id);
    }


    public edit(): Observable<ProduitDto> {
        return this.http.put<ProduitDto>(this.API, this.selectedProduit);
    }


     public findByCriteria(produit:ProduitDto): Observable<Array<ProduitDto>>{
           return this.http.post<Array<ProduitDto>>(this.API + 'search', produit);
    }

   public findByIdWithAssociatedList(produit:ProduitDto):Observable<ProduitDto>{
         return this.http.get<ProduitDto>(this.API + 'detail/id/' +produit.id);
    }

    // getters and setters


    get produits(): Array<ProduitDto> {
        if(this._produits == null){
            this._produits = new Array<ProduitDto>();
        }
        return this._produits;
     }

    set produits(value: Array<ProduitDto>) {
        this._produits = value;
    }

    get selectedProduit(): ProduitDto {
        if(this._selectedProduit == null){
            this._selectedProduit = new ProduitDto();
        }
        return this._selectedProduit;
    }

    set selectedProduit(value: ProduitDto) {
        this._selectedProduit = value;
    }

    get produitSelections(): Array<ProduitDto> {
        if(this._produitSelections == null){
            this._produitSelections = new Array<ProduitDto>();
        }
        return this._produitSelections;
    }


    set produitSelections(value: Array<ProduitDto>) {
        this._produitSelections = value;
    }

    get createProduitDialog(): boolean {
        return this._createProduitDialog;
    }

    set createProduitDialog(value: boolean) {
        this._createProduitDialog = value;
    }

    get editProduitDialog(): boolean {
        return this._editProduitDialog;
    }

    set editProduitDialog(value: boolean) {
        this._editProduitDialog = value;
    }

    get viewProduitDialog(): boolean {
        return this._viewProduitDialog;
    }

    set viewProduitDialog(value: boolean) {
        this._viewProduitDialog = value;
    }

    get searchProduit(): ProduitDto {
         if(this._searchProduit==null){
            this._searchProduit=new ProduitDto();
        }
        return this._searchProduit;
    }

    set searchProduit(value: ProduitDto) {
        this._searchProduit = value;
    }
}
