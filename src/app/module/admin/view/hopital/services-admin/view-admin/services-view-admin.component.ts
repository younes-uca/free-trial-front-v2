import {Component, OnInit} from '@angular/core';
import {ServicesService} from 'src/app/controller/service/Services.service';
import {ServicesDto} from 'src/app/controller/model/Services.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-services-view-admin',
  templateUrl: './services-view-admin.component.html'
})
export class ServicesViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private servicesService: ServicesService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewServicesDialog  = false;
    }


    get servicess(): Array<ServicesDto> {
        return this.servicesService.servicess;
    }
    set servicess(value: Array<ServicesDto>) {
        this.servicesService.servicess = value;
    }

     get selectedServices(): ServicesDto {
        return this.servicesService.selectedServices;
     }
    set selectedServices(value: ServicesDto) {
        this.servicesService.selectedServices = value;
    }

   get viewServicesDialog(): boolean {
           return this.servicesService.viewServicesDialog;
   }

    set viewServicesDialog(value: boolean) {
        this.servicesService.viewServicesDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
