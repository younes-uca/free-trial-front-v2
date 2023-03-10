import {Component, OnInit} from '@angular/core';
import {FreeTrialStudentEmailTemplateService} from 'src/app/controller/service/FreeTrialStudentEmailTemplate.service';
import {FreeTrialStudentEmailTemplateDto} from 'src/app/controller/model/FreeTrialStudentEmailTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-free-trial-student-email-template-view-admin',
  templateUrl: './free-trial-student-email-template-view-admin.component.html'
})
export class FreeTrialStudentEmailTemplateViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private freeTrialStudentEmailTemplateService: FreeTrialStudentEmailTemplateService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewFreeTrialStudentEmailTemplateDialog  = false;
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

   get viewFreeTrialStudentEmailTemplateDialog(): boolean {
           return this.freeTrialStudentEmailTemplateService.viewFreeTrialStudentEmailTemplateDialog;
   }

    set viewFreeTrialStudentEmailTemplateDialog(value: boolean) {
        this.freeTrialStudentEmailTemplateService.viewFreeTrialStudentEmailTemplateDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
