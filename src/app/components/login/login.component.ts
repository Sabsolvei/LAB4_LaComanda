import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
// import {LoginObject} from "./shared/login-object.model";
// import {AuthenticationService} from "./shared/authentication.service";
// import {StorageService} from "../core/services/storage.service";
import * as firebase from "firebase";

import {Router, ActivatedRoute} from "@angular/router";

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
    //private formBuilder: FormBuilder,
    public auth: AuthProvider,
    //private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router) {
      
     }
  ngOnInit() {
    this.auth.logout();
  }
 
  ingresar() {
    this.loading = true;
    this.auth.loginUser(this.usuario, this.pass)
      .then(
        data => {
          this.router.navigate(['../mesas']);
        }
      );
  }

  registrar() {
    return this.auth.registerUser(this.usuario, this.pass)
    .catch(err => Promise.reject(err))
    .then(
      () => {
        console.log('USUARIO CREADO');
        // El usuario se ha creado correctamente.
        // envio el mail para confirmar el mail
        let user = firebase.auth().currentUser;

        user
          .sendEmailVerification()
          .then(user => Promise.resolve(user))
          .catch(error => Promise.reject(error));
      },

      () => Promise.reject("Reintente por favor")
    );
  }

}
