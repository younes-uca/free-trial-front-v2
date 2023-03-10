import {Component, OnInit, Input} from '@angular/core';
import {FreeTrialStudentWhatsTemplateService} from 'src/app/controller/service/FreeTrialStudentWhatsTemplate.service';
import {FreeTrialStudentWhatsTemplateDto} from 'src/app/controller/model/FreeTrialStudentWhatsTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-free-trial-student-whats-template-create-admin',
  templateUrl: './free-trial-student-whats-template-create-admin.component.html'
})
export class FreeTrialStudentWhatsTemplateCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





    constructor(private datePipe: DatePipe, private freeTrialStudentWhatsTemplateService: FreeTrialStudentWhatsTemplateService
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
     this.freeTrialStudentWhatsTemplateService.save().subscribe(freeTrialStudentWhatsTemplate=>{
        if(freeTrialStudentWhatsTemplate != null){
           this.freeTrialStudentWhatsTemplates.push({...freeTrialStudentWhatsTemplate});
           this.createFreeTrialStudentWhatsTemplateDialog = false;
           this.submitted = false;
           this.selectedFreeTrialStudentWhatsTemplate = new FreeTrialStudentWhatsTemplateDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Free trial student whats template existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
    }









    hideCreateDialog(){
        this.createFreeTrialStudentWhatsTemplateDialog  = false;
        this.setValidation(true);
    }

    get freeTrialStudentWhatsTemplates(): Array<FreeTrialStudentWhatsTemplateDto> {
        return this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates;
    }
    set freeTrialStudentWhatsTemplates(value: Array<FreeTrialStudentWhatsTemplateDto>) {
            this.freeTrialStudentWhatsTemplateService.freeTrialStudentWhatsTemplates = value;
    }
    get selectedFreeTrialStudentWhatsTemplate(): FreeTrialStudentWhatsTemplateDto {
               return this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate;
     }
    set selectedFreeTrialStudentWhatsTemplate(value: FreeTrialStudentWhatsTemplateDto) {
        this.freeTrialStudentWhatsTemplateService.selectedFreeTrialStudentWhatsTemplate = value;
    }
    get createFreeTrialStudentWhatsTemplateDialog(): boolean {
        return this.freeTrialStudentWhatsTemplateService.createFreeTrialStudentWhatsTemplateDialog;
    }
    set createFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this.freeTrialStudentWhatsTemplateService.createFreeTrialStudentWhatsTemplateDialog= value;
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
