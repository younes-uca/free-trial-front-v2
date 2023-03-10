import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { User } from './controller/model/User.model';
import { AuthService } from './controller/service/Auth.service';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    roleAdmin = false;

    constructor(public app: AppComponent, public appMain: AppMainComponent, private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.loadInfos();
        if ( this.authService.authenticatedUser.roles[0] === 'ROLE_ADMIN'){
            this.roleAdmin = true;
        }
    }



    get authenticatedUser(): User{
        return this.authService.authenticatedUser;
    }

    logout(){
        this.authService.logout();
    }
}
