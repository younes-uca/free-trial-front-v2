import {Component, OnInit} from '@angular/core';
import {FreeTrialStudentWhatsTemplateService} from 'src/app/controller/service/FreeTrialStudentWhatsTemplate.service';
import {FreeTrialStudentWhatsTemplateDto} from 'src/app/controller/model/FreeTrialStudentWhatsTemplate.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-free-trial-student-whats-template-view-admin',
  templateUrl: './free-trial-student-whats-template-view-admin.component.html'
})
export class FreeTrialStudentWhatsTemplateViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private freeTrialStudentWhatsTemplateService: FreeTrialStudentWhatsTemplateService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewFreeTrialStudentWhatsTemplateDialog  = false;
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

   get viewFreeTrialStudentWhatsTemplateDialog(): boolean {
           return this.freeTrialStudentWhatsTemplateService.viewFreeTrialStudentWhatsTemplateDialog;
   }

    set viewFreeTrialStudentWhatsTemplateDialog(value: boolean) {
        this.freeTrialStudentWhatsTemplateService.viewFreeTrialStudentWhatsTemplateDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
