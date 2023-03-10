import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin:any[];
  modelanonymous: any[];
    modeladmin : any[];
  constructor(public app: AppComponent,
   public appMain: AppMainComponent,
   private roleService: RoleService,
   private authService:AuthService,
  private router: Router) {}

  ngOnInit() {


    this.modeladmin =
      [
              {
                label: 'Configuration',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste statut free trial',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/statut-free-trial/list']
                    },
                    {
                      label: 'Liste level',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/level/list']
                    },
                    {
                      label: 'Liste teacher',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/teacher/list']
                    },
                    {
                      label: 'Liste student',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/student/list']
                    },
                ]
              },
              {
                label: 'Hopital Management',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste services',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/hopital/services/list']
                    },
                ]
              },
              {
                label: 'Gestion Commande',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste free trial',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/free-trial/list']
                    },
                    {
                      label: 'Liste free trial configuration',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/free-trial-configuration/list']
                    },
                    {
                      label: 'Liste free trial detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/free-trial-detail/list']
                    },
                    {
                      label: 'Liste free trial teacher whats template',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/free-trial-teacher-whats-template/list']
                    },
                    {
                      label: 'Liste free trial student whats template',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/free-trial-student-whats-template/list']
                    },
                    {
                      label: 'Liste free trial teacher email template',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/free-trial-teacher-email-template/list']
                    },
                    {
                      label: 'Liste free trial student email template',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/free-trial-student-email-template/list']
                    },
                ]
              },
    ]
        if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        })
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}
