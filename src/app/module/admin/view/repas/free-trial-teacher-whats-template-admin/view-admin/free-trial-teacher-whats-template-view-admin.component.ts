import {Component, OnInit} from '@angular/core';
import {FreeTrialTeacherWhatsTemplateService} from 'src/app/controller/service/FreeTrialTeacherWhatsTemplate.service';
import {FreeTrialTeacherWhatsTemplateDto} from 'src/app/controller/model/FreeTrialTeacherWhatsTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-free-trial-teacher-whats-template-view-admin',
  templateUrl: './free-trial-teacher-whats-template-view-admin.component.html'
})
export class FreeTrialTeacherWhatsTemplateViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private freeTrialTeacherWhatsTemplateService: FreeTrialTeacherWhatsTemplateService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewFreeTrialTeacherWhatsTemplateDialog  = false;
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

   get viewFreeTrialTeacherWhatsTemplateDialog(): boolean {
           return this.freeTrialTeacherWhatsTemplateService.viewFreeTrialTeacherWhatsTemplateDialog;
   }

    set viewFreeTrialTeacherWhatsTemplateDialog(value: boolean) {
        this.freeTrialTeacherWhatsTemplateService.viewFreeTrialTeacherWhatsTemplateDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
