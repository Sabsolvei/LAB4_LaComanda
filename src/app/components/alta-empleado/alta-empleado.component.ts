import { usuario } from './../../clases/usuario';
import { UsuarioService } from './../../providers/usuarios/usuario.service';
import { AuthProvider } from './../../providers/auth/auth';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";

import { Iusuario } from 'src/app/clases/usuario';
// import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss']
})
export class AltaEmpleadoComponent implements OnInit {
  title = 'JavaSampleApproach';
  description = 'Angular-Firebase Demo';
  public rutaArchivo: any;
  public image: any;
  public task: any;
  public options: FormGroup;
  public model: any = {};
  public perfiles: any[] = [
    { value: 'mozo', viewValue: 'Mozo' },
    { value: 'bartender', viewValue: 'Bartender' },
    { value: 'cocinero', viewValue: 'Pastelero' },
    { value: 'cocinero', viewValue: 'Cocinero' },
    { value: 'cervecero', viewValue: 'Cervecero' },
    { value: 'admin', viewValue: 'Administrador' }
  ];
  // public files: UploadFile[] = [];
  public urlfoto: string;
  public realFile: any;

  constructor(
    private router: Router,
    private auth: AuthProvider,
    public storage: AngularFireStorage,
    private usuarioProvider: UsuarioService) { }

  ngOnInit() {
  }

  guardarEmpleado() {}

  // public dropped(event: UploadEvent) {
  //   this.files = event.files;
  //   for (const droppedFile of event.files) {

  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {
  //         // Here you can access the real file
  //         console.log(droppedFile.relativePath);
  //         console.log(file);
  //         this.realFile = file;
  //       });
  //     } else {
  //       // It was a directory (empty directories are added, otherwise only files)
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  public guardarFoto() {
    let ref = firebase.database().ref("Uploads");
    let storage = firebase.storage();
    let pathReference = storage.ref('images/stars.jpg');
    pathReference.getDownloadURL().then(function (url) {
      console.log(url);
      ref.push().set({
        imgurl: url
      });
    });
  }

  public createUploadTask(file: string) {
    this.rutaArchivo = `empleados/${this.model.dni}_${new Date().getTime()}.jpg`;
    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(this.rutaArchivo).putString(file, 'data_url');
    return this.task;
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }




  registrar() {
    return this.auth.registerUser(this.model.email, '123456')
      .then((idUsuario) => {
        console.log(idUsuario.user.uid);
        console.log('USUARIO CREADO');


        let usuarioNuevo: Iusuario =
        {
          nombre: this.model.nombre,
          apellido: this.model.apellido,
          dni: this.model.documento,
          perfil: this.model.perfil,
          email: this.model.email,
          cuil: this.model.cuil,
          id: idUsuario.user.uid,
          foto: this.urlfoto
        }
        console.log(usuarioNuevo);
        if (this.urlfoto) {
          this.usuarioProvider.guardarUsuario(usuarioNuevo);
        }
        else {
          this.usuarioProvider.guardarUsuarioConFoto(usuarioNuevo);
        }

      })
      .catch(error => {
        console.log(this.usuarioProvider.errorAuth(error));
      });
  }

}
