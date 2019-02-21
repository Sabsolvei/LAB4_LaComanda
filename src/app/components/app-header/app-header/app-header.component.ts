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
  public isLoggedIn$: Observable<boolean>;
  public hasMenu$: Observable<boolean>;

  constructor(private _auth: AuthProvider) { }

  ngOnInit() {
    this.isLoggedIn$ = this._auth.isLoggedIn;
    this.hasMenu$ = this._auth.hasMenu;
  }

  salir() {
    this._auth.logout()
      .then(() => {
        // this._router.navigate(['../login']);
        localStorage.clear();
      });
  }

}
