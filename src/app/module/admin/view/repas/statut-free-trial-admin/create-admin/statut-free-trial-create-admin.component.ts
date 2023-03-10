import {Component, OnInit, Input} from '@angular/core';
import {StatutFreeTrialService} from 'src/app/controller/service/StatutFreeTrial.service';
import {StatutFreeTrialDto} from 'src/app/controller/model/StatutFreeTrial.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-statut-free-trial-create-admin',
  templateUrl: './statut-free-trial-create-admin.component.html'
})
export class StatutFreeTrialCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatutFreeTrialLibelle = true;
   _validStatutFreeTrialCode = true;




    constructor(private datePipe: DatePipe, private statutFreeTrialService: StatutFreeTrialService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  

) {
}

    ngOnInit(): void {
}




private setValidation(value: boolean){
    this.validStatutFreeTrialLibelle = value;
    this.validStatutFreeTrialCode = value;
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
     this.statutFreeTrialService.save().subscribe(statutFreeTrial=>{
        if(statutFreeTrial != null){
           this.statutFreeTrials.push({...statutFreeTrial});
           this.createStatutFreeTrialDialog = false;
           this.submitted = false;
           this.selectedStatutFreeTrial = new StatutFreeTrialDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Statut free trial existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateStatutFreeTrialLibelle();
        this.validateStatutFreeTrialCode();
    }

    private validateStatutFreeTrialLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStatutFreeTrial.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validStatutFreeTrialLibelle = false;
        } else {
            this.validStatutFreeTrialLibelle = true;
        }
    }
    private validateStatutFreeTrialCode(){
        if (this.stringUtilService.isEmpty(this.selectedStatutFreeTrial.code)) {
        this.errorMessages.push('Code non valide');
        this.validStatutFreeTrialCode = false;
        } else {
            this.validStatutFreeTrialCode = true;
        }
    }








    hideCreateDialog(){
        this.createStatutFreeTrialDialog  = false;
        this.setValidation(true);
    }

    get statutFreeTrials(): Array<StatutFreeTrialDto> {
        return this.statutFreeTrialService.statutFreeTrials;
    }
    set statutFreeTrials(value: Array<StatutFreeTrialDto>) {
            this.statutFreeTrialService.statutFreeTrials = value;
    }
    get selectedStatutFreeTrial(): StatutFreeTrialDto {
               return this.statutFreeTrialService.selectedStatutFreeTrial;
     }
    set selectedStatutFreeTrial(value: StatutFreeTrialDto) {
        this.statutFreeTrialService.selectedStatutFreeTrial = value;
    }
    get createStatutFreeTrialDialog(): boolean {
        return this.statutFreeTrialService.createStatutFreeTrialDialog;
    }
    set createStatutFreeTrialDialog(value: boolean) {
        this.statutFreeTrialService.createStatutFreeTrialDialog= value;
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
    get validStatutFreeTrialLibelle(): boolean {
        return this._validStatutFreeTrialLibelle;
    }

    set validStatutFreeTrialLibelle(value: boolean) {
         this._validStatutFreeTrialLibelle = value;
    }
    get validStatutFreeTrialCode(): boolean {
        return this._validStatutFreeTrialCode;
    }

    set validStatutFreeTrialCode(value: boolean) {
         this._validStatutFreeTrialCode = value;
    }


}
