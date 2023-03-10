import {Component, OnInit} from '@angular/core';
import {FreeTrialTeacherEmailTemplateService} from 'src/app/controller/service/FreeTrialTeacherEmailTemplate.service';
import {FreeTrialTeacherEmailTemplateDto} from 'src/app/controller/model/FreeTrialTeacherEmailTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-free-trial-teacher-email-template-view-admin',
  templateUrl: './free-trial-teacher-email-template-view-admin.component.html'
})
export class FreeTrialTeacherEmailTemplateViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private freeTrialTeacherEmailTemplateService: FreeTrialTeacherEmailTemplateService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewFreeTrialTeacherEmailTemplateDialog  = false;
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

   get viewFreeTrialTeacherEmailTemplateDialog(): boolean {
           return this.freeTrialTeacherEmailTemplateService.viewFreeTrialTeacherEmailTemplateDialog;
   }

    set viewFreeTrialTeacherEmailTemplateDialog(value: boolean) {
        this.freeTrialTeacherEmailTemplateService.viewFreeTrialTeacherEmailTemplateDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
