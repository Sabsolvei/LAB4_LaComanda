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
    // public perfilLogueado: string;
    uid: string;
    public usuarioLogueado;
    public perfil$ = new BehaviorSubject("");
    private loggedIn = new BehaviorSubject<boolean>(false);
    private loading = new BehaviorSubject<boolean>(false);
    private itemsMenu = new BehaviorSubject<boolean>(true);
    private perfilNombre$ = new BehaviorSubject<string>(null);

    constructor(
        private afAuth: AngularFireAuth,
        public _usuario: UsuarioService,
        public router: Router
    ) { }

    get perfilNombre() {
        return this.perfilNombre$.asObservable();
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    get isLoading() {
        return this.loading.asObservable();
    }

    get hasMenu() {
        return this.itemsMenu.asObservable();
    }

    guardarPerfilNombre(nombre: string){
        this.perfilNombre$.next(nombre);
    }

    mostrarMenu() {
        this.itemsMenu.next(true);
    }

    ocultarMenu() {
        this.itemsMenu.next(false);
    }

    dejarPasar() {
        this.loggedIn.next(true);
    }

    loadingOn() {
        this.loading.next(true);
    }

    loadingOff() {
        this.loading.next(false);
    }



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

            case "admin":
                destinoPage = "mesas";
                break;

            case "mozo":
                destinoPage = "mesas";
                break;

            case "bartender":
                destinoPage = "pedidos";
                break;

            case "cocinero":
                destinoPage = "pedidos";
                break;

            case "cervecero":
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

                    this.loggedIn.next(true);
                    let respuesta: boolean;
                    let usuario = firebase.auth().currentUser;
                    this.corroborarUsuario(usuario)
                        .then((us: Iusuario) => {
                            this.usuarioLogueado = us;
                            localStorage.setItem("userID", data.user.uid);

                            if (us.perfil == "Cliente") {
                                localStorage.setItem("userDni", us.dni);
                            }
                            resolve(us);
                        })
                        .catch((rta) => {
                            respuesta = rta;
                            console.log("NO SE ENCONTRÓ USUARIO");
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
                    reject(false);
                })
                .then((u: Iusuario) => {
                    resolve(u);
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
        this.loggedIn.next(false);
        this.router.navigate(['/login']);

        this.usuarioLogueado = null;
        return this.afAuth.auth.signOut();
    }

    public cargarLocalStorage(user: Iusuario) {
        localStorage.setItem("perfil", user.perfil);
        localStorage.setItem("userID", user.id.toString());
        localStorage.setItem("email", user.email.toString());
        localStorage.setItem("nombre", user.nombre.toString().toUpperCase());
    }

    public redireccionar(user: Iusuario) {
        let destinoPage: string;
        destinoPage = this.buscarDestino(user.perfil);
        this.router.navigate(['/' + destinoPage]);
    }

    public getUser(): Observable<firebase.User> {
        return this.afAuth.user;
    }

    //   public obtenerEmailUsuarioActual() {
    //     return this.afAuth.auth.currentUser.email;
    //   }
}
