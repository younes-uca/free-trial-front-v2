import {Component, OnInit} from '@angular/core';
import {LevelService} from 'src/app/controller/service/Level.service';
import {LevelDto} from 'src/app/controller/model/Level.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-level-view-admin',
  templateUrl: './level-view-admin.component.html'
})
export class LevelViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private levelService: LevelService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewLevelDialog  = false;
    }


    get levels(): Array<LevelDto> {
        return this.levelService.levels;
    }
    set levels(value: Array<LevelDto>) {
        this.levelService.levels = value;
    }

     get selectedLevel(): LevelDto {
        return this.levelService.selectedLevel;
     }
    set selectedLevel(value: LevelDto) {
        this.levelService.selectedLevel = value;
    }

   get viewLevelDialog(): boolean {
           return this.levelService.viewLevelDialog;
   }

    set viewLevelDialog(value: boolean) {
        this.levelService.viewLevelDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
