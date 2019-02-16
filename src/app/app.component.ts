import { AuthProvider } from './providers/auth/auth';
import { Component } from '@angular/core';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { Iusuario } from './clases/usuario';
//import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LaComanda';

  constructor(
    public _auth: AuthProvider,
    public _router: Router
  ) {
    let config = {
      apiKey: "AIzaSyDAVAzNO0VC2-Rh5enNGQgfnO9Fie5pY2A",
      authDomain: "lacomanda-b9c2b.firebaseapp.com",
      databaseURL: "https://lacomanda-b9c2b.firebaseio.com",
      projectId: "lacomanda-b9c2b",
      storageBucket: "lacomanda-b9c2b.appspot.com",
      messagingSenderId: "176807941599"
    };

  }

  ngOnInit() {
  }

  salir() {
    this._auth.logout()
      .then(() => {
        this._router.navigate(['../login']);
        localStorage.clear();
      });
  }

}
