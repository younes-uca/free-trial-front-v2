import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { FreeTrialCreateAdminComponent } from './free-trial-admin/create-admin/free-trial-create-admin.component';
import { FreeTrialEditAdminComponent } from './free-trial-admin/edit-admin/free-trial-edit-admin.component';
import { FreeTrialViewAdminComponent } from './free-trial-admin/view-admin/free-trial-view-admin.component';
import { FreeTrialListAdminComponent } from './free-trial-admin/list-admin/free-trial-list-admin.component';
import { StatutFreeTrialCreateAdminComponent } from './statut-free-trial-admin/create-admin/statut-free-trial-create-admin.component';
import { StatutFreeTrialEditAdminComponent } from './statut-free-trial-admin/edit-admin/statut-free-trial-edit-admin.component';
import { StatutFreeTrialViewAdminComponent } from './statut-free-trial-admin/view-admin/statut-free-trial-view-admin.component';
import { StatutFreeTrialListAdminComponent } from './statut-free-trial-admin/list-admin/statut-free-trial-list-admin.component';
import { FreeTrialConfigurationCreateAdminComponent } from './free-trial-configuration-admin/create-admin/free-trial-configuration-create-admin.component';
import { FreeTrialConfigurationEditAdminComponent } from './free-trial-configuration-admin/edit-admin/free-trial-configuration-edit-admin.component';
import { FreeTrialConfigurationViewAdminComponent } from './free-trial-configuration-admin/view-admin/free-trial-configuration-view-admin.component';
import { FreeTrialConfigurationListAdminComponent } from './free-trial-configuration-admin/list-admin/free-trial-configuration-list-admin.component';
import { FreeTrialDetailCreateAdminComponent } from './free-trial-detail-admin/create-admin/free-trial-detail-create-admin.component';
import { FreeTrialDetailEditAdminComponent } from './free-trial-detail-admin/edit-admin/free-trial-detail-edit-admin.component';
import { FreeTrialDetailViewAdminComponent } from './free-trial-detail-admin/view-admin/free-trial-detail-view-admin.component';
import { FreeTrialDetailListAdminComponent } from './free-trial-detail-admin/list-admin/free-trial-detail-list-admin.component';
import { FreeTrialTeacherWhatsTemplateCreateAdminComponent } from './free-trial-teacher-whats-template-admin/create-admin/free-trial-teacher-whats-template-create-admin.component';
import { FreeTrialTeacherWhatsTemplateEditAdminComponent } from './free-trial-teacher-whats-template-admin/edit-admin/free-trial-teacher-whats-template-edit-admin.component';
import { FreeTrialTeacherWhatsTemplateViewAdminComponent } from './free-trial-teacher-whats-template-admin/view-admin/free-trial-teacher-whats-template-view-admin.component';
import { FreeTrialTeacherWhatsTemplateListAdminComponent } from './free-trial-teacher-whats-template-admin/list-admin/free-trial-teacher-whats-template-list-admin.component';
import { LevelCreateAdminComponent } from './level-admin/create-admin/level-create-admin.component';
import { LevelEditAdminComponent } from './level-admin/edit-admin/level-edit-admin.component';
import { LevelViewAdminComponent } from './level-admin/view-admin/level-view-admin.component';
import { LevelListAdminComponent } from './level-admin/list-admin/level-list-admin.component';
import { TeacherCreateAdminComponent } from './teacher-admin/create-admin/teacher-create-admin.component';
import { TeacherEditAdminComponent } from './teacher-admin/edit-admin/teacher-edit-admin.component';
import { TeacherViewAdminComponent } from './teacher-admin/view-admin/teacher-view-admin.component';
import { TeacherListAdminComponent } from './teacher-admin/list-admin/teacher-list-admin.component';
import { StudentCreateAdminComponent } from './student-admin/create-admin/student-create-admin.component';
import { StudentEditAdminComponent } from './student-admin/edit-admin/student-edit-admin.component';
import { StudentViewAdminComponent } from './student-admin/view-admin/student-view-admin.component';
import { StudentListAdminComponent } from './student-admin/list-admin/student-list-admin.component';
import { FreeTrialStudentWhatsTemplateCreateAdminComponent } from './free-trial-student-whats-template-admin/create-admin/free-trial-student-whats-template-create-admin.component';
import { FreeTrialStudentWhatsTemplateEditAdminComponent } from './free-trial-student-whats-template-admin/edit-admin/free-trial-student-whats-template-edit-admin.component';
import { FreeTrialStudentWhatsTemplateViewAdminComponent } from './free-trial-student-whats-template-admin/view-admin/free-trial-student-whats-template-view-admin.component';
import { FreeTrialStudentWhatsTemplateListAdminComponent } from './free-trial-student-whats-template-admin/list-admin/free-trial-student-whats-template-list-admin.component';
import { FreeTrialTeacherEmailTemplateCreateAdminComponent } from './free-trial-teacher-email-template-admin/create-admin/free-trial-teacher-email-template-create-admin.component';
import { FreeTrialTeacherEmailTemplateEditAdminComponent } from './free-trial-teacher-email-template-admin/edit-admin/free-trial-teacher-email-template-edit-admin.component';
import { FreeTrialTeacherEmailTemplateViewAdminComponent } from './free-trial-teacher-email-template-admin/view-admin/free-trial-teacher-email-template-view-admin.component';
import { FreeTrialTeacherEmailTemplateListAdminComponent } from './free-trial-teacher-email-template-admin/list-admin/free-trial-teacher-email-template-list-admin.component';
import { FreeTrialStudentEmailTemplateCreateAdminComponent } from './free-trial-student-email-template-admin/create-admin/free-trial-student-email-template-create-admin.component';
import { FreeTrialStudentEmailTemplateEditAdminComponent } from './free-trial-student-email-template-admin/edit-admin/free-trial-student-email-template-edit-admin.component';
import { FreeTrialStudentEmailTemplateViewAdminComponent } from './free-trial-student-email-template-admin/view-admin/free-trial-student-email-template-view-admin.component';
import { FreeTrialStudentEmailTemplateListAdminComponent } from './free-trial-student-email-template-admin/list-admin/free-trial-student-email-template-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PaginatorModule} from 'primeng/paginator';
import {EditorModule} from "primeng/editor";



@NgModule({
  declarations: [

    FreeTrialCreateAdminComponent,
    FreeTrialListAdminComponent,
    FreeTrialViewAdminComponent,
    FreeTrialEditAdminComponent,
    StatutFreeTrialCreateAdminComponent,
    StatutFreeTrialListAdminComponent,
    StatutFreeTrialViewAdminComponent,
    StatutFreeTrialEditAdminComponent,
    FreeTrialConfigurationCreateAdminComponent,
    FreeTrialConfigurationListAdminComponent,
    FreeTrialConfigurationViewAdminComponent,
    FreeTrialConfigurationEditAdminComponent,
    FreeTrialDetailCreateAdminComponent,
    FreeTrialDetailListAdminComponent,
    FreeTrialDetailViewAdminComponent,
    FreeTrialDetailEditAdminComponent,
    FreeTrialTeacherWhatsTemplateCreateAdminComponent,
    FreeTrialTeacherWhatsTemplateListAdminComponent,
    FreeTrialTeacherWhatsTemplateViewAdminComponent,
    FreeTrialTeacherWhatsTemplateEditAdminComponent,
    LevelCreateAdminComponent,
    LevelListAdminComponent,
    LevelViewAdminComponent,
    LevelEditAdminComponent,
    TeacherCreateAdminComponent,
    TeacherListAdminComponent,
    TeacherViewAdminComponent,
    TeacherEditAdminComponent,
    StudentCreateAdminComponent,
    StudentListAdminComponent,
    StudentViewAdminComponent,
    StudentEditAdminComponent,
    FreeTrialStudentWhatsTemplateCreateAdminComponent,
    FreeTrialStudentWhatsTemplateListAdminComponent,
    FreeTrialStudentWhatsTemplateViewAdminComponent,
    FreeTrialStudentWhatsTemplateEditAdminComponent,
    FreeTrialTeacherEmailTemplateCreateAdminComponent,
    FreeTrialTeacherEmailTemplateListAdminComponent,
    FreeTrialTeacherEmailTemplateViewAdminComponent,
    FreeTrialTeacherEmailTemplateEditAdminComponent,
    FreeTrialStudentEmailTemplateCreateAdminComponent,
    FreeTrialStudentEmailTemplateListAdminComponent,
    FreeTrialStudentEmailTemplateViewAdminComponent,
    FreeTrialStudentEmailTemplateEditAdminComponent,
  ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
        PaginatorModule,
        EditorModule,
    ],
  exports: [
  FreeTrialCreateAdminComponent,
  FreeTrialListAdminComponent,
  FreeTrialViewAdminComponent,
  FreeTrialEditAdminComponent,
  StatutFreeTrialCreateAdminComponent,
  StatutFreeTrialListAdminComponent,
  StatutFreeTrialViewAdminComponent,
  StatutFreeTrialEditAdminComponent,
  FreeTrialConfigurationCreateAdminComponent,
  FreeTrialConfigurationListAdminComponent,
  FreeTrialConfigurationViewAdminComponent,
  FreeTrialConfigurationEditAdminComponent,
  FreeTrialDetailCreateAdminComponent,
  FreeTrialDetailListAdminComponent,
  FreeTrialDetailViewAdminComponent,
  FreeTrialDetailEditAdminComponent,
  FreeTrialTeacherWhatsTemplateCreateAdminComponent,
  FreeTrialTeacherWhatsTemplateListAdminComponent,
  FreeTrialTeacherWhatsTemplateViewAdminComponent,
  FreeTrialTeacherWhatsTemplateEditAdminComponent,
  LevelCreateAdminComponent,
  LevelListAdminComponent,
  LevelViewAdminComponent,
  LevelEditAdminComponent,
  TeacherCreateAdminComponent,
  TeacherListAdminComponent,
  TeacherViewAdminComponent,
  TeacherEditAdminComponent,
  StudentCreateAdminComponent,
  StudentListAdminComponent,
  StudentViewAdminComponent,
  StudentEditAdminComponent,
  FreeTrialStudentWhatsTemplateCreateAdminComponent,
  FreeTrialStudentWhatsTemplateListAdminComponent,
  FreeTrialStudentWhatsTemplateViewAdminComponent,
  FreeTrialStudentWhatsTemplateEditAdminComponent,
  FreeTrialTeacherEmailTemplateCreateAdminComponent,
  FreeTrialTeacherEmailTemplateListAdminComponent,
  FreeTrialTeacherEmailTemplateViewAdminComponent,
  FreeTrialTeacherEmailTemplateEditAdminComponent,
  FreeTrialStudentEmailTemplateCreateAdminComponent,
  FreeTrialStudentEmailTemplateListAdminComponent,
  FreeTrialStudentEmailTemplateViewAdminComponent,
  FreeTrialStudentEmailTemplateEditAdminComponent,
  ],
  entryComponents: [],
})
export class RepasAdminModule { }
