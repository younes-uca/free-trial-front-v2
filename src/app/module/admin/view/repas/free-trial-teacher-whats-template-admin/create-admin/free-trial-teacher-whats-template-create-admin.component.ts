import {Component, OnInit, Input} from '@angular/core';
import {FreeTrialTeacherWhatsTemplateService} from 'src/app/controller/service/FreeTrialTeacherWhatsTemplate.service';
import {FreeTrialTeacherWhatsTemplateDto} from 'src/app/controller/model/FreeTrialTeacherWhatsTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-free-trial-teacher-whats-template-create-admin',
  templateUrl: './free-trial-teacher-whats-template-create-admin.component.html'
})
export class FreeTrialTeacherWhatsTemplateCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





    constructor(private datePipe: DatePipe, private freeTrialTeacherWhatsTemplateService: FreeTrialTeacherWhatsTemplateService
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
     this.freeTrialTeacherWhatsTemplateService.save().subscribe(freeTrialTeacherWhatsTemplate=>{
        if(freeTrialTeacherWhatsTemplate != null){
           this.freeTrialTeacherWhatsTemplates.push({...freeTrialTeacherWhatsTemplate});
           this.createFreeTrialTeacherWhatsTemplateDialog = false;
           this.submitted = false;
           this.selectedFreeTrialTeacherWhatsTemplate = new FreeTrialTeacherWhatsTemplateDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Free trial teacher whats template existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
    }









    hideCreateDialog(){
        this.createFreeTrialTeacherWhatsTemplateDialog  = false;
        this.setValidation(true);
    }

    get freeTrialTeacherWhatsTemplates(): Array<FreeTrialTeacherWhatsTemplateDto> {
        return this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates;
    }
    set freeTrialTeacherWhatsTemplates(value: Array<FreeTrialTeacherWhatsTemplateDto>) {
            this.freeTrialTeacherWhatsTemplateService.freeTrialTeacherWhatsTemplates = value;
    }
    get selectedFreeTrialTeacherWhatsTemplate(): FreeTrialTeacherWhatsTemplateDto {
               return this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate;
     }
    set selectedFreeTrialTeacherWhatsTemplate(value: FreeTrialTeacherWhatsTemplateDto) {
        this.freeTrialTeacherWhatsTemplateService.selectedFreeTrialTeacherWhatsTemplate = value;
    }
    get createFreeTrialTeacherWhatsTemplateDialog(): boolean {
        return this.freeTrialTeacherWhatsTemplateService.createFreeTrialTeacherWhatsTemplateDialog;
    }
    set createFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this.freeTrialTeacherWhatsTemplateService.createFreeTrialTeacherWhatsTemplateDialog= value;
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
