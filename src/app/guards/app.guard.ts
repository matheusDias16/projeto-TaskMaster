import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';


export const appGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const routerService = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    routerService.navigate(['/'])
    return false
  }

  return true;
};


