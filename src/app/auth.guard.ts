import { AuthProvider } from './providers/auth/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthProvider,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise<boolean>((resolve, reject) => {
      this.auth.Session.subscribe(s => {
        if (!s) {
          resolve(false);
        } else {
          // para cuando está logueado, al no entrar al login, le explicito que puede cargarme el menú
          console.log("DEJAR PASAR!");
          this.auth.dejarPasar();

          if (localStorage.getItem("perfil") != null) {
            if (localStorage.getItem("perfil") == "admin") {
              this.auth.mostrarMenu();
            } else {
              this.auth.ocultarMenu();
            }
          } else {
            this.auth.ocultarMenu();
          }

          resolve(true);
        }
      });
    });
  }
}
