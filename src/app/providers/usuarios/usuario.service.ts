import { FileUpload } from './../../clases/file-upload';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireDatabase } from 'angularfire2/database';
import { Iusuario } from "../../clases/usuario";

import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public afDB: AngularFireDatabase) { }


  public obtenerUsuarios() {
    return this.afDB.list<Iusuario>('usuarios').valueChanges();
  }

  public buscarUsuarioxMail(email: string): Promise<Iusuario> {
    let promesa = new Promise<Iusuario>((resolve, reject) => {

      this.afDB
        .list<Iusuario>("/usuarios/", ref =>
          ref
            .orderByChild("email")
            .equalTo(email)
            .limitToFirst(1)
        )
        .valueChanges()
        .subscribe((user: Iusuario[]) => {

          console.log("USUARIO");
          console.log(user);
          if (user.length > 0) {
            resolve(user[0]);
          } else {
            reject();
          }
        });
    });

    return promesa;
  }

  public guardarUsuario(us: Iusuario) {
    return this.afDB.list("usuarios").push({
      nombre: us.nombre,
      apellido: us.apellido,
      dni: us.dni,
      perfil: us.perfil,
      email: us.email,
      cuil: us.cuil,
      id: us.id
    });
  }

  public guardarUsuarioConFoto(us: Iusuario) {
    return this.afDB.list("usuarios").push({
      nombre: us.nombre,
      apellido: us.apellido,
      dni: us.dni,
      perfil: us.perfil,
      email: us.email,
      cuil: us.cuil,
      id: us.id,
      foto: us.foto
    });
  }


  buscarNombreYApellido(id: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {

      this.afDB
        .list("/usuarios/", ref => ref.orderByChild("id").equalTo(id))
        .valueChanges().subscribe((data: Iusuario[]) => {
          if (data.length > 0) {
            resolve(data[0].nombre + ' ' + data[0].apellido);
          } else {
            resolve("");
          }
        })
    })
  }

  buscarDni(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.afDB
        .list("/usuarios/", ref => ref.orderByChild("id").equalTo(id))
        .valueChanges().subscribe((data: Iusuario[]) => {
          if (data.length > 0) {
            resolve(data[0].dni);
          } else {
            reject("No se encontró el usuario");
          }
        });
    });
  }

  buscarFoto(idUsuario: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.buscarDni(idUsuario)
        .then(dni => {
          this.afDB
            .list("/uploads/", ref => ref.orderByChild("name").equalTo(dni))
            .valueChanges().subscribe((data: FileUpload[]) => {
              if (data.length > 0) {
                resolve(data[0].url);
              } else {
                reject("No se encontró su foto");
              }
            });
        })
    })
  }

  // buscarFoto(idUsuario: string): Promise<string> {
  //   let promesa: Promise<string>;
  //   this.buscarDni(idUsuario)
  //     .then(dni => {
  //       promesa = new Promise<string>((resolve, reject) => {
  //         this.afDB
  //           .list("/uploads/", ref => ref.orderByChild("name").equalTo(dni))
  //           .valueChanges().subscribe((data: FileUpload[]) => {
  //             if (data.length > 0) {
  //               console.log("FOTO ENCONTRADO");
  //               console.log(data[0].url);
  //               resolve(data[0].url);
  //             } else {
  //               reject("No se encontró su foto");
  //             }
  //           });
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   return promesa;
  // }


  public errorAuth(error: any) {
    let errorCode = error.code;
    if (errorCode === "auth/invalid-email") {
      return "Mail invalido";
    } else if (errorCode === "auth/email-already-in-use") {
      return "El mail ya se encuentra utilizado";
    } else if (errorCode === "auth/operation-not-allowed") {
      return "el usuario no fue encontrado";
    } else if (errorCode === "auth/weak-password") {
      return "La contraseña no es lo suficientemente segura";
    } else {
      return "Ha ocurrido un error";
    }
  }


}


