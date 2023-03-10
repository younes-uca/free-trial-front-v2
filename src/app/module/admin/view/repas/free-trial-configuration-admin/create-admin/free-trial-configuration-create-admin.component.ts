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
  selector: 'app-free-trial-configuration-create-admin',
  templateUrl: './free-trial-configuration-create-admin.component.html'
})
export class FreeTrialConfigurationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





    constructor(private datePipe: DatePipe, private freeTrialConfigurationService: FreeTrialConfigurationService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  

) {
}

    ngOnInit(): void {
}




private setValidation(value: boolean){
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
     this.freeTrialConfigurationService.save().subscribe(freeTrialConfiguration=>{
        if(freeTrialConfiguration != null){
           this.freeTrialConfigurations.push({...freeTrialConfiguration});
           this.createFreeTrialConfigurationDialog = false;
           this.submitted = false;
           this.selectedFreeTrialConfiguration = new FreeTrialConfigurationDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Free trial configuration existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
    }










    hideCreateDialog(){
        this.createFreeTrialConfigurationDialog  = false;
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
    get createFreeTrialConfigurationDialog(): boolean {
        return this.freeTrialConfigurationService.createFreeTrialConfigurationDialog;
    }
    set createFreeTrialConfigurationDialog(value: boolean) {
        this.freeTrialConfigurationService.createFreeTrialConfigurationDialog= value;
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


}
