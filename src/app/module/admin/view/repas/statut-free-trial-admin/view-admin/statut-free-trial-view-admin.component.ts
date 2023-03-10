import {Component, OnInit} from '@angular/core';
import {StatutFreeTrialService} from 'src/app/controller/service/StatutFreeTrial.service';
import {StatutFreeTrialDto} from 'src/app/controller/model/StatutFreeTrial.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-statut-free-trial-view-admin',
  templateUrl: './statut-free-trial-view-admin.component.html'
})
export class StatutFreeTrialViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private statutFreeTrialService: StatutFreeTrialService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewStatutFreeTrialDialog  = false;
    }


    get statutFreeTrials(): Array<StatutFreeTrialDto> {
        return this.statutFreeTrialService.statutFreeTrials;
    }
    set statutFreeTrials(value: Array<StatutFreeTrialDto>) {
        this.statutFreeTrialService.statutFreeTrials = value;
    }

     get selectedStatutFreeTrial(): StatutFreeTrialDto {
        return this.statutFreeTrialService.selectedStatutFreeTrial;
     }
    set selectedStatutFreeTrial(value: StatutFreeTrialDto) {
        this.statutFreeTrialService.selectedStatutFreeTrial = value;
    }

   get viewStatutFreeTrialDialog(): boolean {
           return this.statutFreeTrialService.viewStatutFreeTrialDialog;
   }

    set viewStatutFreeTrialDialog(value: boolean) {
        this.statutFreeTrialService.viewStatutFreeTrialDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
