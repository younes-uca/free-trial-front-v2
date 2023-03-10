import {Component, OnInit} from '@angular/core';
import {FreeTrialConfigurationService} from 'src/app/controller/service/FreeTrialConfiguration.service';
import {FreeTrialConfigurationDto} from 'src/app/controller/model/FreeTrialConfiguration.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-free-trial-configuration-view-admin',
  templateUrl: './free-trial-configuration-view-admin.component.html'
})
export class FreeTrialConfigurationViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private freeTrialConfigurationService: FreeTrialConfigurationService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewFreeTrialConfigurationDialog  = false;
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

   get viewFreeTrialConfigurationDialog(): boolean {
           return this.freeTrialConfigurationService.viewFreeTrialConfigurationDialog;
   }

    set viewFreeTrialConfigurationDialog(value: boolean) {
        this.freeTrialConfigurationService.viewFreeTrialConfigurationDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
