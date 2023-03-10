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
  selector: 'app-free-trial-student-whats-template-edit-admin',
  templateUrl: './free-trial-student-whats-template-edit-admin.component.html'
})
export class FreeTrialStudentWhatsTemplateEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





    constructor(private datePipe: DatePipe, private freeTrialStudentWhatsTemplateService: FreeTrialStudentWhatsTemplateService, private stringUtilService: StringUtilService,
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
         this.freeTrialStudentWhatsTemplateService.edit().subscribe(freeTrialStudentWhatsTemplate=>{
         const myIndex = this.freeTrialStudentWhatsTemplates.findIndex(e => e.id === this.selectedFreeTrialStudentWhatsTemplate.id);
         this.freeTrialStudentWhatsTemplates[myIndex] = freeTrialStudentWhatsTemplate;
         this.editFreeTrialStudentWhatsTemplateDialog = false;
         this.submitted = false;
         this.selectedFreeTrialStudentWhatsTemplate = new FreeTrialStudentWhatsTemplateDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
    }





    hideEditDialog(){
        this.editFreeTrialStudentWhatsTemplateDialog  = false;
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

   get editFreeTrialStudentWhatsTemplateDialog(): boolean {
           return this.freeTrialStudentWhatsTemplateService.editFreeTrialStudentWhatsTemplateDialog;
   }
    set editFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this.freeTrialStudentWhatsTemplateService.editFreeTrialStudentWhatsTemplateDialog= value;
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
