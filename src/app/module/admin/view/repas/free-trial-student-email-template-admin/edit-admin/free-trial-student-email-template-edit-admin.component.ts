import {Component, OnInit, Input} from '@angular/core';
import {FreeTrialStudentEmailTemplateService} from 'src/app/controller/service/FreeTrialStudentEmailTemplate.service';
import {FreeTrialStudentEmailTemplateDto} from 'src/app/controller/model/FreeTrialStudentEmailTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-free-trial-student-email-template-edit-admin',
  templateUrl: './free-trial-student-email-template-edit-admin.component.html'
})
export class FreeTrialStudentEmailTemplateEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





    constructor(private datePipe: DatePipe, private freeTrialStudentEmailTemplateService: FreeTrialStudentEmailTemplateService, private stringUtilService: StringUtilService,
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
         this.freeTrialStudentEmailTemplateService.edit().subscribe(freeTrialStudentEmailTemplate=>{
         const myIndex = this.freeTrialStudentEmailTemplates.findIndex(e => e.id === this.selectedFreeTrialStudentEmailTemplate.id);
         this.freeTrialStudentEmailTemplates[myIndex] = freeTrialStudentEmailTemplate;
         this.editFreeTrialStudentEmailTemplateDialog = false;
         this.submitted = false;
         this.selectedFreeTrialStudentEmailTemplate = new FreeTrialStudentEmailTemplateDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
    }





    hideEditDialog(){
        this.editFreeTrialStudentEmailTemplateDialog  = false;
        this.setValidation(true);
    }

    get freeTrialStudentEmailTemplates(): Array<FreeTrialStudentEmailTemplateDto> {
        return this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates;
    }
    set freeTrialStudentEmailTemplates(value: Array<FreeTrialStudentEmailTemplateDto>) {
            this.freeTrialStudentEmailTemplateService.freeTrialStudentEmailTemplates = value;
    }

    get selectedFreeTrialStudentEmailTemplate(): FreeTrialStudentEmailTemplateDto {
           return this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate;
    }
    set selectedFreeTrialStudentEmailTemplate(value: FreeTrialStudentEmailTemplateDto) {
        this.freeTrialStudentEmailTemplateService.selectedFreeTrialStudentEmailTemplate = value;
    }

   get editFreeTrialStudentEmailTemplateDialog(): boolean {
           return this.freeTrialStudentEmailTemplateService.editFreeTrialStudentEmailTemplateDialog;
   }
    set editFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this.freeTrialStudentEmailTemplateService.editFreeTrialStudentEmailTemplateDialog= value;
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
