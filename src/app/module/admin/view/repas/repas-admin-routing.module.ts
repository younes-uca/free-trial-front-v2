
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



import { FreeTrialListAdminComponent } from './free-trial-admin/list-admin/free-trial-list-admin.component';
import { StatutFreeTrialListAdminComponent } from './statut-free-trial-admin/list-admin/statut-free-trial-list-admin.component';
import { FreeTrialConfigurationListAdminComponent } from './free-trial-configuration-admin/list-admin/free-trial-configuration-list-admin.component';
import { FreeTrialDetailListAdminComponent } from './free-trial-detail-admin/list-admin/free-trial-detail-list-admin.component';
import { FreeTrialTeacherWhatsTemplateListAdminComponent } from './free-trial-teacher-whats-template-admin/list-admin/free-trial-teacher-whats-template-list-admin.component';
import { LevelListAdminComponent } from './level-admin/list-admin/level-list-admin.component';
import { TeacherListAdminComponent } from './teacher-admin/list-admin/teacher-list-admin.component';
import { StudentListAdminComponent } from './student-admin/list-admin/student-list-admin.component';
import { FreeTrialStudentWhatsTemplateListAdminComponent } from './free-trial-student-whats-template-admin/list-admin/free-trial-student-whats-template-list-admin.component';
import { FreeTrialTeacherEmailTemplateListAdminComponent } from './free-trial-teacher-email-template-admin/list-admin/free-trial-teacher-email-template-list-admin.component';
import { FreeTrialStudentEmailTemplateListAdminComponent } from './free-trial-student-email-template-admin/list-admin/free-trial-student-email-template-list-admin.component';
@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'free-trial',
                            children: [
                                {
                                    path: 'list',
                                    component: FreeTrialListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'statut-free-trial',
                            children: [
                                {
                                    path: 'list',
                                    component: StatutFreeTrialListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'free-trial-configuration',
                            children: [
                                {
                                    path: 'list',
                                    component: FreeTrialConfigurationListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'free-trial-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: FreeTrialDetailListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'free-trial-teacher-whats-template',
                            children: [
                                {
                                    path: 'list',
                                    component: FreeTrialTeacherWhatsTemplateListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'level',
                            children: [
                                {
                                    path: 'list',
                                    component: LevelListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'teacher',
                            children: [
                                {
                                    path: 'list',
                                    component: TeacherListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'student',
                            children: [
                                {
                                    path: 'list',
                                    component: StudentListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'free-trial-student-whats-template',
                            children: [
                                {
                                    path: 'list',
                                    component: FreeTrialStudentWhatsTemplateListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'free-trial-teacher-email-template',
                            children: [
                                {
                                    path: 'list',
                                    component: FreeTrialTeacherEmailTemplateListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'free-trial-student-email-template',
                            children: [
                                {
                                    path: 'list',
                                    component: FreeTrialStudentEmailTemplateListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class RepasAdminRoutingModule { }
