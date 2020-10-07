import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../components/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.getLoggedIn()) {
            return true;
        } else {
            sessionStorage.setItem('returnUrl', state.url);
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
