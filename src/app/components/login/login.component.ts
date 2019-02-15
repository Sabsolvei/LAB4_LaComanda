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
    this._auth.Session.subscribe(_session => {
      if (!_session) {
        this._router.navigate(['../login']);
      } else {
        this._auth.getUser().subscribe(user => {
          this._auth.corroborarUsuario(user)
            .catch(err => Promise.reject(err))
            .then((user: Iusuario) => {
              this._auth.cargarLocalStorage(user);
              this._auth.redireccionar(user);
            });
        });
      }
    });
  }



  registrar() {
    return this._auth.registerUser(this.usuario, this.pass)
      .catch(err => Promise.reject(err))
      .then(
        () => {
          console.log('USUARIO CREADO');
          let user = firebase.auth().currentUser;
          user
            .sendEmailVerification()
            .then(user => Promise.resolve(user))
            .catch(error => Promise.reject(error));
        },
        () => Promise.reject("Reintente por favor")
      );
  }

  public agregar(email: string) {
    this.usuario = email;
    this.pass = '123456';
  }

  public ingresar() {
    this._auth.loginUser(this.usuario, this.pass)
      .catch(err => Promise.reject(err))
      .then((user: Iusuario) => {
        this._auth.cargarLocalStorage(user);
        this._auth.redireccionar(user);
      });
  }



}
