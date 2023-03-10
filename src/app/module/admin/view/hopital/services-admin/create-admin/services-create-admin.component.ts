import {Component, OnInit, Input} from '@angular/core';
import {ServicesService} from 'src/app/controller/service/Services.service';
import {ServicesDto} from 'src/app/controller/model/Services.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-services-create-admin',
  templateUrl: './services-create-admin.component.html'
})
export class ServicesCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validServicesCode = true;
   _validServicesLibelle = true;




    constructor(private datePipe: DatePipe, private servicesService: ServicesService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  

) {
}

    ngOnInit(): void {
}




private setValidation(value: boolean){
    this.validServicesCode = value;
    this.validServicesLibelle = value;
    }


    public save(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
      }
    }

    public saveWithShowOption(showList: boolean){
     this.servicesService.save().subscribe(services=>{
        if(services != null){
           this.servicess.push({...services});
           this.createServicesDialog = false;
           this.submitted = false;
           this.selectedServices = new ServicesDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Services existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateServicesCode();
        this.validateServicesLibelle();
    }

    private validateServicesCode(){
        if (this.stringUtilService.isEmpty(this.selectedServices.code)) {
        this.errorMessages.push('Code non valide');
        this.validServicesCode = false;
        } else {
            this.validServicesCode = true;
        }
    }
    private validateServicesLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedServices.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validServicesLibelle = false;
        } else {
            this.validServicesLibelle = true;
        }
    }








    hideCreateDialog(){
        this.createServicesDialog  = false;
        this.setValidation(true);
    }

    get servicess(): Array<ServicesDto> {
        return this.servicesService.servicess;
    }
    set servicess(value: Array<ServicesDto>) {
            this.servicesService.servicess = value;
    }
    get selectedServices(): ServicesDto {
               return this.servicesService.selectedServices;
     }
    set selectedServices(value: ServicesDto) {
        this.servicesService.selectedServices = value;
    }
    get createServicesDialog(): boolean {
        return this.servicesService.createServicesDialog;
    }
    set createServicesDialog(value: boolean) {
        this.servicesService.createServicesDialog= value;
    }


    get dateFormat(){
        return environment.dateFormatCreate;
    }
    get dateFormatColumn(){
        return environment.dateFormatCreate;
    }
     get submitted(): boolean {
        return this._submitted;
    }
    set submitted(value: boolean) {
        this._submitted = value;
    }


    get errorMessages(): string[] {
        return this._errorMessages;
    }
    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }
    get validServicesCode(): boolean {
        return this._validServicesCode;
    }

    set validServicesCode(value: boolean) {
         this._validServicesCode = value;
    }
    get validServicesLibelle(): boolean {
        return this._validServicesLibelle;
    }

    set validServicesLibelle(value: boolean) {
         this._validServicesLibelle = value;
    }


}
