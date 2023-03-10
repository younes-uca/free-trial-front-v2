import {Component, OnInit} from '@angular/core';
import {LevelService} from 'src/app/controller/service/Level.service';
import {LevelDto} from 'src/app/controller/model/Level.model';
import {LevelCriteria} from 'src/app/controller/criteria/LevelCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';




import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-level-list-admin',
  templateUrl: './level-list-admin.component.html'
})
export class LevelListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Level';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private levelService: LevelService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadLevels(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Level', 'list');
        isPermistted ? this.levelService.findAll().subscribe(levels => this.levels = levels,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.levelService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.levels = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new LevelCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editLevel(level: LevelDto){
        const isPermistted = await this.roleService.isPermitted('Level', 'edit');
        if(isPermistted){
              this.levelService.findByIdWithAssociatedList(level).subscribe(res => {
              this.selectedLevel = res;

              this.editLevelDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewLevel(level: LevelDto){
        const isPermistted = await this.roleService.isPermitted('Level', 'view');
        if(isPermistted){
           this.levelService.findByIdWithAssociatedList(level).subscribe(res => {
           this.selectedLevel = res;
            this.viewLevelDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateLevel(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedLevel = new LevelDto();
            this.createLevelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Level', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                            this.levelService.deleteMultiple().subscribe(data=>{
                                for (let item of data) {
                                    let index = this.levels.findIndex(element=> item.id === element.id);
                                    if (index != -1){
                                        this.levels.splice(index,1);
                                    }
                                }
                            });
                        }
            });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.levelSelections == null || this.levelSelections.length==0
    }


    public async deleteLevel(level: LevelDto){
       const isPermistted = await this.roleService.isPermitted('Level', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Level) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.levelService.delete(level).subscribe(status=>{
              if(status > 0){
                  const position = this.levels.indexOf(level);
                  position > -1 ? this.levels.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Level Supprimé',
                    life: 3000
                  });
              }

        },error=>console.log(error))
                 }
            });
    }else{
    this.messageService.add({
    severity: 'error', summary: 'erreur', detail: 'Problème de permission'
    });
    }
    }


    public async duplicateLevel(level: LevelDto) {
        this.levelService.findByIdWithAssociatedList(level).subscribe(
	    res => {
	       this.initDuplicateLevel(res);
	       this.selectedLevel = res;
	       this.selectedLevel.id = null;


            this.createLevelDialog = true;
        });

	}

	initDuplicateLevel(res: LevelDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.levels.map(e => {
            return {
                 'Libelle': e.libelle ,
                 'Code': e.code ,
            }
        });

        this.criteriaData = [{
            'Libelle': this.search.libelle ? this.search.libelle : environment.emptyForExport ,
            'Code': this.search.code ? this.search.code : environment.emptyForExport ,
        }];
      }

    get levels() : Array<LevelDto> {
           return this.levelService.levels;
    }
    set levels(value: Array<LevelDto>) {
        this.levelService.levels = value;
    }

    get levelSelections() : Array<LevelDto> {
           return this.levelService.levelSelections;
    }
    set levelSelections(value: Array<LevelDto>) {
        this.levelService.levelSelections = value;
    }

    get selectedLevel() : LevelDto {
           return this.levelService.selectedLevel;
    }
    set selectedLevel(value: LevelDto) {
        this.levelService.selectedLevel = value;
    }
    
    get createLevelDialog() :boolean {
           return this.levelService.createLevelDialog;
    }
    set createLevelDialog(value: boolean) {
        this.levelService.createLevelDialog= value;
    }
    
    get editLevelDialog() :boolean {
           return this.levelService.editLevelDialog;
    }
    set editLevelDialog(value: boolean) {
        this.levelService.editLevelDialog= value;
    }
    get viewLevelDialog() :boolean {
           return this.levelService.viewLevelDialog;
    }
    set viewLevelDialog(value: boolean) {
        this.levelService.viewLevelDialog = value;
    }
       
     get search() : LevelCriteria {
        return this.levelService.search;
     }
    set search(value: LevelCriteria) {
        this.levelService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
