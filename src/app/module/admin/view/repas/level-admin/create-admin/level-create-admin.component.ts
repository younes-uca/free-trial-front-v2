import {Component, OnInit, Input} from '@angular/core';
import {LevelService} from 'src/app/controller/service/Level.service';
import {LevelDto} from 'src/app/controller/model/Level.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-level-create-admin',
  templateUrl: './level-create-admin.component.html'
})
export class LevelCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validLevelLibelle = true;
   _validLevelCode = true;




    constructor(private datePipe: DatePipe, private levelService: LevelService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  

) {
}

    ngOnInit(): void {
}




private setValidation(value: boolean){
    this.validLevelLibelle = value;
    this.validLevelCode = value;
    }


    public save(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
      }
    }

    public saveWithShowOption(showList: boolean){
     this.levelService.save().subscribe(level=>{
        if(level != null){
           this.levels.push({...level});
           this.createLevelDialog = false;
           this.submitted = false;
           this.selectedLevel = new LevelDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Level existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateLevelLibelle();
        this.validateLevelCode();
    }

    private validateLevelLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedLevel.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validLevelLibelle = false;
        } else {
            this.validLevelLibelle = true;
        }
    }
    private validateLevelCode(){
        if (this.stringUtilService.isEmpty(this.selectedLevel.code)) {
        this.errorMessages.push('Code non valide');
        this.validLevelCode = false;
        } else {
            this.validLevelCode = true;
        }
    }







    hideCreateDialog(){
        this.createLevelDialog  = false;
        this.setValidation(true);
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
    get createLevelDialog(): boolean {
        return this.levelService.createLevelDialog;
    }
    set createLevelDialog(value: boolean) {
        this.levelService.createLevelDialog= value;
    }


    get dateFormat(){
        return environment.dateFormatCreate;
    }
    get dateFormatColumn(){
        return environment.dateFormatCreate;
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
    get validLevelLibelle(): boolean {
        return this._validLevelLibelle;
    }

    set validLevelLibelle(value: boolean) {
         this._validLevelLibelle = value;
    }
    get validLevelCode(): boolean {
        return this._validLevelCode;
    }

    set validLevelCode(value: boolean) {
         this._validLevelCode = value;
    }


}
