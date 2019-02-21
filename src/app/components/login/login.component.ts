import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import * as firebase from "firebase";
import { Router, ActivatedRoute } from "@angular/router";
import { Iusuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  public usuario;
  public pass;

  constructor(
    public _auth: AuthProvider,
    private route: ActivatedRoute,
    private _router: Router) {

  }

  ngOnInit() {
   console.log("LOGIN!!!!!!!!!!!!");
    this._auth.Session.subscribe(_session => {
      if (!_session) {
        // console.log('SESION CERRADA');
        //  this._router.navigate(['../login']);
      } else {
        //  console.log('SESION ABIERTA');
        // this._auth.getUser().subscribe(user => {
        //   this._auth.corroborarUsuario(user)
        //     .catch(err => Promise.reject(err))
        //     .then((user: Iusuario) => {
        //       this._auth.cargarLocalStorage(user);
        //       this._auth.redireccionar(user);
        //     });
        // });
      }
    });
  }

  public agregar(email: string) {
    this.usuario = email;
    this.pass = '123456';
  }

  public ingresar() {
    this._auth.loadingOn();
    this._auth.loginUser(this.usuario, this.pass)
      .catch(err => Promise.reject(err))
      .then((user: Iusuario) => {
        this._auth.cargarLocalStorage(user);
        this._auth.redireccionar(user);
        this._auth.loadingOff();
      });
  }

  public ingresarComoAnonimo() {
    localStorage.setItem('perfil', 'anonimo');
    this._router.navigate(['../consulta']);
  }
}


  // registrar() {
  //   this._auth.loadingOn();
  //   return this._auth.registerUser(this.usuario, this.pass)
  //     .catch(err => Promise.reject(err))
  //     .then(
  //       () => {
  //         this._auth.loadingOff();
  //         let user = firebase.auth().currentUser;
  //         user
  //           .sendEmailVerification()
  //           .then(user => Promise.resolve(user))
  //           .catch(error => Promise.reject(error));
  //       },
  //       () => Promise.reject("Reintente por favor")
  //     );
  // }
