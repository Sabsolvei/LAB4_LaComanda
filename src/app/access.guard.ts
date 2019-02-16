import { Router } from '@angular/router';
import { AuthProvider } from './providers/auth/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AccessGuard implements CanActivate {
  constructor(
    private auth: AuthProvider,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //  let path = route.url; 
    let respuesta: boolean = false;
    let perfil = localStorage.getItem('perfil');
    let roles = route.data.rolesPermitidos;
    roles.forEach(rol => {
      if (rol == perfil) {
        respuesta = true;
      }
    });

    return respuesta;
  }

}
