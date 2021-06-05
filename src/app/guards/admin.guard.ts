import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    localStorage.getItem('JWT_TOKEN');
    if (!this.getDecodedAccessToken(localStorage.getItem('JWT_TOKEN'))) {
      this.router.navigate(['/login']);
    }
    return this.authService.isLoggedIn();
  }
  getDecodedAccessToken(token: string): any {
    let tok;
    try{
        tok= jwt_decode(token);
        if(tok.isAdmin)
        return true;
        else
        return false
    }
    catch(Error){
        return null;
    }
  }
}