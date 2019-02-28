import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
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
  public captcha;
  public loginForm: FormGroup;

  constructor(
    public _auth: AuthProvider,
    private route: ActivatedRoute,
    private _router: Router) {

  }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required])
      //    captcha: new FormControl('', [Validators.required])
    });

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

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }
  // 6Ldya5MUAAAAAO9vNRR9uxBbKrkiKaBK4vQE6FHR
  // 6LeXa5MUAAAAAEnlTOFoCgVUyGjqtTYOs845t7wD
  // 6LcbbJMUAAAAADIMnlI3hH-bpn1WL5We30CGfXoy

  public agregar(email: string) {
    this.loginForm.setValue({ email: email, pass: '123456' });

  }

  public login(loginFormValues: any) {
    if (this.loginForm.valid) {
      this.ingresar(loginFormValues);
    }
  }

  public ingresar(loginFormValues: any) {
  //  if (this.captcha) {

      this._auth.loadingOn();
      this._auth.loginUser(loginFormValues.email, loginFormValues.pass)
        .catch(err => Promise.reject(err))
        .then((user: Iusuario) => {
          this._auth.guardarPerfilNombre(user.nombre + ' (' + user.perfil + ') ' );
          if (user.perfil == 'admin') {
            this._auth.mostrarMenu();
          }
          else {
            this._auth.ocultarMenu();
          }
          this._auth.cargarLocalStorage(user);
          this._auth.redireccionar(user);
          this._auth.loadingOff();
        });
  //  }
  }

  public ingresarComoAnonimo() {
    localStorage.setItem('perfil', 'anonimo');
    this._router.navigate(['../consulta']);
  }
}
