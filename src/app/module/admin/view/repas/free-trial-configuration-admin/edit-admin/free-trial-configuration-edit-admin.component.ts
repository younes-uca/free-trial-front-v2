import {Component, OnInit, Input} from '@angular/core';
import {FreeTrialConfigurationService} from 'src/app/controller/service/FreeTrialConfiguration.service';
import {FreeTrialConfigurationDto} from 'src/app/controller/model/FreeTrialConfiguration.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-free-trial-configuration-edit-admin',
  templateUrl: './free-trial-configuration-edit-admin.component.html'
})
export class FreeTrialConfigurationEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





    constructor(private datePipe: DatePipe, private freeTrialConfigurationService: FreeTrialConfigurationService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    
    ) {

    }

    ngOnInit(): void {
}




    private setValidation(value : boolean){
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
         this.freeTrialConfigurationService.edit().subscribe(freeTrialConfiguration=>{
         const myIndex = this.freeTrialConfigurations.findIndex(e => e.id === this.selectedFreeTrialConfiguration.id);
         this.freeTrialConfigurations[myIndex] = freeTrialConfiguration;
         this.editFreeTrialConfigurationDialog = false;
         this.submitted = false;
         this.selectedFreeTrialConfiguration = new FreeTrialConfigurationDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
    }





    hideEditDialog(){
        this.editFreeTrialConfigurationDialog  = false;
        this.setValidation(true);
    }

    get freeTrialConfigurations(): Array<FreeTrialConfigurationDto> {
        return this.freeTrialConfigurationService.freeTrialConfigurations;
    }
    set freeTrialConfigurations(value: Array<FreeTrialConfigurationDto>) {
            this.freeTrialConfigurationService.freeTrialConfigurations = value;
    }

    get selectedFreeTrialConfiguration(): FreeTrialConfigurationDto {
           return this.freeTrialConfigurationService.selectedFreeTrialConfiguration;
    }
    set selectedFreeTrialConfiguration(value: FreeTrialConfigurationDto) {
        this.freeTrialConfigurationService.selectedFreeTrialConfiguration = value;
    }

   get editFreeTrialConfigurationDialog(): boolean {
           return this.freeTrialConfigurationService.editFreeTrialConfigurationDialog;
   }
    set editFreeTrialConfigurationDialog(value: boolean) {
        this.freeTrialConfigurationService.editFreeTrialConfigurationDialog= value;
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

}
