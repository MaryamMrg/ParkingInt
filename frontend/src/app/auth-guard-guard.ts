import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { Authservice } from './authservice';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: Authservice,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      
      const expectedRole = route.data['expectedRole'];
      const userRole = this.authService.getRole();
      
      if (expectedRole) {
        // Check if expectedRole 
        if (Array.isArray(expectedRole)) {
          
          if (!expectedRole.includes(userRole)) {
            this.router.navigate(['/']);
            return false;
          }
        } else {
          
          if (userRole !== expectedRole) {
            this.router.navigate(['/']);
            return false;
          }
        }
      }
      
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}