import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanLoad,  UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (!localStorage.getItem('perfil')) {
        this.router.navigateByUrl('/login');
      }
    return true;
  }

}
