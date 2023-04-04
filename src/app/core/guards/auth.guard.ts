import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private routes: Router,
    private tokenStorage: TokenStorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifier si l'utilisateur a un jeton d'authentification valide
    if (this.tokenStorage.getToken() != null) {
      return true; // Laisser l'utilisateur accéder à la route
    } else {
      // Rediriger l'utilisateur vers la page de connexion
      this.routes.navigate(['/auth/login']);
      return false; // Empêcher l'utilisateur d'accéder à la route
    }
  }
}

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthtestGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }

// }

// import { Injectable } from "@angular/core";
// import {
//     ActivatedRouteSnapshot,
//     CanActivate,
//     Router,
//     RouterStateSnapshot,
//     UrlTree
// } from "@angular/router";
// import { AuthService } from "../_services/auth.service";

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(
//         private authService: AuthService,
//         private router: Router) { }
//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): boolean | Promise<boolean> {
//         var isAuthenticated = this.authService.getAuthStatus();
//         if (!isAuthenticated) {
//             this.router.navigate(['/login']);
//         }
//         return isAuthenticated;
//     }
// }
