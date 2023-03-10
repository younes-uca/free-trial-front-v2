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
  selector: 'app-statut-free-trial-edit-admin',
  templateUrl: './statut-free-trial-edit-admin.component.html'
})
export class StatutFreeTrialEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatutFreeTrialLibelle = true;
   _validStatutFreeTrialCode = true;




    constructor(private datePipe: DatePipe, private statutFreeTrialService: StatutFreeTrialService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    
    ) {

    }

    ngOnInit(): void {
}




    private setValidation(value : boolean){
        this.validStatutFreeTrialLibelle = value;
        this.validStatutFreeTrialCode = value;
        }


    public edit(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
      }
    }

    public editWithShowOption(showList: boolean){
         this.statutFreeTrialService.edit().subscribe(statutFreeTrial=>{
         const myIndex = this.statutFreeTrials.findIndex(e => e.id === this.selectedStatutFreeTrial.id);
         this.statutFreeTrials[myIndex] = statutFreeTrial;
         this.editStatutFreeTrialDialog = false;
         this.submitted = false;
         this.selectedStatutFreeTrial = new StatutFreeTrialDto();
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




    hideEditDialog(){
        this.editStatutFreeTrialDialog  = false;
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

   get editStatutFreeTrialDialog(): boolean {
           return this.statutFreeTrialService.editStatutFreeTrialDialog;
   }
    set editStatutFreeTrialDialog(value: boolean) {
        this.statutFreeTrialService.editStatutFreeTrialDialog= value;
    }


    get dateFormat(){
        return environment.dateFormatEdit;
    }
    get dateFormatColumn(){
         return environment.dateFormatEdit;
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
