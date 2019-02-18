import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../../../providers/auth/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public perfil: string = null;
  isLoggedIn$: Observable<boolean>;                  // {1}

  constructor(private _auth: AuthProvider) { }

  ngOnInit() {
    this.perfil = localStorage.getItem('perfil');

    this.isLoggedIn$ = this._auth.isLoggedIn; // {2}
  }

  salir() {
    this._auth.logout()
      .then(() => {
        // this._router.navigate(['../login']);
        localStorage.clear();
      });
  }

}
