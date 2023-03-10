import {Component, OnInit, Input} from '@angular/core';
import {FreeTrialTeacherEmailTemplateService} from 'src/app/controller/service/FreeTrialTeacherEmailTemplate.service';
import {FreeTrialTeacherEmailTemplateDto} from 'src/app/controller/model/FreeTrialTeacherEmailTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-free-trial-teacher-email-template-create-admin',
  templateUrl: './free-trial-teacher-email-template-create-admin.component.html'
})
export class FreeTrialTeacherEmailTemplateCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





    constructor(private datePipe: DatePipe, private freeTrialTeacherEmailTemplateService: FreeTrialTeacherEmailTemplateService
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
     this.freeTrialTeacherEmailTemplateService.save().subscribe(freeTrialTeacherEmailTemplate=>{
        if(freeTrialTeacherEmailTemplate != null){
           this.freeTrialTeacherEmailTemplates.push({...freeTrialTeacherEmailTemplate});
           this.createFreeTrialTeacherEmailTemplateDialog = false;
           this.submitted = false;
           this.selectedFreeTrialTeacherEmailTemplate = new FreeTrialTeacherEmailTemplateDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Free trial teacher email template existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
    }









    hideCreateDialog(){
        this.createFreeTrialTeacherEmailTemplateDialog  = false;
        this.setValidation(true);
    }

    get freeTrialTeacherEmailTemplates(): Array<FreeTrialTeacherEmailTemplateDto> {
        return this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates;
    }
    set freeTrialTeacherEmailTemplates(value: Array<FreeTrialTeacherEmailTemplateDto>) {
            this.freeTrialTeacherEmailTemplateService.freeTrialTeacherEmailTemplates = value;
    }
    get selectedFreeTrialTeacherEmailTemplate(): FreeTrialTeacherEmailTemplateDto {
               return this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate;
     }
    set selectedFreeTrialTeacherEmailTemplate(value: FreeTrialTeacherEmailTemplateDto) {
        this.freeTrialTeacherEmailTemplateService.selectedFreeTrialTeacherEmailTemplate = value;
    }
    get createFreeTrialTeacherEmailTemplateDialog(): boolean {
        return this.freeTrialTeacherEmailTemplateService.createFreeTrialTeacherEmailTemplateDialog;
    }
    set createFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this.freeTrialTeacherEmailTemplateService.createFreeTrialTeacherEmailTemplateDialog= value;
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
