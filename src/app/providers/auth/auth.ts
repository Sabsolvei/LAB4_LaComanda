import { UsuarioService } from './../usuarios/usuario.service';
import { Iusuario } from "./../../clases/usuario";
//import { UsuariosProvider } from "./../usuarios/usuarios";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
//import { LoginPage } from "../../pages/login/login";
import { Observable, BehaviorSubject } from "rxjs";
//import { of } from "rxjs/observable/of";

import * as firebase from "firebase";
import { Router } from '@angular/router';

@Injectable()
export class AuthProvider {
    //public perfilLogueado: string;
    uid: string;
    public perfil$ = new BehaviorSubject("");

    constructor(
        private afAuth: AngularFireAuth,
        public _usuario: UsuarioService,
        public router: Router
    ) { }

    loginGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }



    buscarDestino(perfil: string): string {
        let destinoPage: string;
        this.perfil$.next(perfil);

        switch (perfil) {

            case "Cliente":
                destinoPage = "consulta";
                break;

            case "Anonimo":
                destinoPage = "registroEmpleados";
                break;

            case "mozo":
                destinoPage = "mesas";
                break;

            case "Bartender":
                destinoPage = "pedidos";
                break;

            case "Cocinero":
                destinoPage = "pedidos";
                break;

            case "Cervecero":
                destinoPage = "pedidos";
                break;

            default:
                destinoPage = "login";
                break;
        }

        return destinoPage;
    }

    //**Registro de usuario. Si logra crear el usuario envia el mail de verificacion */
    registerUser(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        // .catch(err => Promise.reject(err))
        // .then(
        //     () => {
        //         console.log("TERMINO DE CREAR USUARIO: ");
        //         console.log(firebase.auth().currentUser);
        //         console.log(firebase.auth().currentUser.uid);
        //         Promise.resolve(firebase.auth().currentUser.uid);
        //user
        //   .sendEmailVerification()
        //  .then(user => Promise.resolve(user))
        //  .catch(error => Promise.reject(error));
        // },
        // () => Promise.reject("Reintente por favor")
        //   );
    }

    loginUser(email: string, password: string): Promise<any> {
        let promesa = new Promise((resolve, reject) => {
            this.afAuth.auth
                .signInWithEmailAndPassword(email.toLowerCase(), password)
                .then(data => {
                  localStorage.setItem("userID", data.user.uid);

                    let user = firebase.auth().currentUser;
                    this.corroborarUsuario(user).then((us: Iusuario) => {
                        resolve(us);
                    });
                });
        });
        return promesa;
    }

    public corroborarUsuario(user: firebase.User): Promise<any> {
        let promesa = new Promise((resolve, reject) => {
            this._usuario
                .buscarUsuarioxMail(user.email)
                .catch(() => {
                    reject("Usuario inexistente");
                })
                .then((u: Iusuario) => {
                    resolve(u);
                    console.log('DENTRO DE CORROBORAR USUARIO');
                });
        })
        return promesa;
    }
    // Devuelve la session
    public get Session() {
       return this.afAuth.authState;
    }


    // Logout de usuario
    logout() {
        //   console.log(this.afAuth.user.subscribe(user => { console.log(user.email); }));
        return this.afAuth.auth.signOut();
    }

    public cargarLocalStorage(user: Iusuario) {
      //  console.log(user);
        localStorage.setItem("perfil", user.perfil);
        localStorage.setItem("userID", user.id.toString());
        localStorage.setItem("email", user.email.toString());
        localStorage.setItem("nombre", user.nombre.toString().toUpperCase());
    }

    public redireccionar(user: Iusuario) {
        console.log('REDIRECCIONAR');
        let destinoPage: string;
        destinoPage = this.buscarDestino(user.perfil);
        console.log(destinoPage);
        this.router.navigate(['/' + destinoPage]);
    }

    public getUser(): Observable<firebase.User> {
        return this.afAuth.user;
    }


    //   buscarPerfil(): Observable<String> {
    //     return this.perfil$.asObservable();
    //   }

    //   buscarDestino(perfil: string): string {
    //     let destinoPage: string;
    //     this.perfil$.next(perfil);

    //     switch (perfil) {
    //       case "Dueño":
    //         destinoPage = "ReservasPage";
    //         break;

    //       case "Supervisor":
    //         destinoPage = "ReservasPage";
    //         break;

    //       case "Cliente":
    //         destinoPage = "InicioClientePage";
    //         break;

    //       case "Anonimo":
    //         destinoPage = "QrEsperaPage";
    //         break;

    //       case "Cocinero":
    //         destinoPage = "PedidosCocinaPage";
    //         break;

    //       case "Bartender":
    //         destinoPage = "PedidosCocinaPage";

    //         break;
    //       case "Mozo":
    //         destinoPage = "MesasPage";
    //         break;

    //       case "Mestre":
    //         destinoPage = "ReservasMestrePage"; //"EsperaPage";
    //         break;

    //       default:
    //         destinoPage = "LoginPage";
    //         break;
    //     }

    //     return destinoPage;
    //   }

    //   public ingresoAnonimo() {
    //     return this.afAuth.auth.signInAnonymously();
    //   }

    //   public esAnonimo() {
    //     let ay: any;
    //     ay = this.afAuth.auth.onAuthStateChanged(user => {
    //       console.log(user);
    //     });
    //   }

    //   public obtenerEmailUsuarioActual() {
    //     return this.afAuth.auth.currentUser.email;
    //   }
}
