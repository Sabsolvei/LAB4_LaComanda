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
    public auth: AuthProvider,
    private route: ActivatedRoute,
    private router: Router) {

  }


  ngOnInit() {
    // if (this.auth.isLoggedIn) {
    //   this.auth.getUser().subscribe(user => {
    //     this.auth.corroborarUsuario(user)
    //       .catch(err => Promise.reject(err))
    //       .then((user: Iusuario) => {
    //         this.cargarLocalStorage(user);
    //         this.redireccionar(user);
    //       });
    //   });
    // }
    // else {
    //   localStorage.clear();
    // }
  }

  registrar() {
    return this.auth.registerUser(this.usuario, this.pass)
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
    this.auth.loginUser(this.usuario, this.pass)
      .catch(err => Promise.reject(err))
      .then((user: Iusuario) => {
        this.auth.cargarLocalStorage(user);
        this.auth.redireccionar(user);
      });
  }

 

}
