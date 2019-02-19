import { Validators } from '@angular/forms';
import { FileUpload } from './../../clases/file-upload';
import { usuario } from './../../clases/usuario';
import { UsuarioService } from './../../providers/usuarios/usuario.service';
import { AuthProvider } from './../../providers/auth/auth';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";

import { Iusuario } from 'src/app/clases/usuario';
// import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss']
})
export class AltaEmpleadoComponent implements OnInit {

  public formularioAlta: FormGroup;

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
  public file: FileUpload[];

  constructor(
    private router: Router,
    private auth: AuthProvider,
    public storage: AngularFireStorage,
    private usuarioProvider: UsuarioService,
    private location: Location) { }

  ngOnInit() {
    this.formularioAlta = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*')]),
      documento: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.pattern('^[0-9]*$')]),
      cuil: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      perfil: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formularioAlta.controls[controlName].hasError(errorName);
  }

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

  public onCancel = () => {
    this.location.back();
  }

  public guardarEmpleado = (formularioAltaValue) => {
    if (this.formularioAlta.valid) {
      this.executeOwnerCreation(formularioAltaValue);
    }
  }

  private executeOwnerCreation = (formularioAltaValue) => {

    return this.auth.registerUser(formularioAltaValue.email, '123456')
      .then((idUsuario) => {
        console.log(idUsuario.user.uid);
        console.log('USUARIO CREADO');

        let usuarioNuevo: Iusuario = {
          nombre: formularioAltaValue.nombre,
          apellido: formularioAltaValue.apellido,
          dni: formularioAltaValue.documento,
          perfil: formularioAltaValue.perfil,
          email: formularioAltaValue.email,
          cuil: formularioAltaValue.cuil,
          id: idUsuario.user.uid,
          foto: this.urlfoto
        }
        console.log(usuarioNuevo);
        if (this.urlfoto) {
          this.usuarioProvider.guardarUsuarioConFoto(usuarioNuevo);
        }
        else {
          this.usuarioProvider.guardarUsuario(usuarioNuevo);
        }
      })
      .catch(error => {
        console.log(this.usuarioProvider.errorAuth(error));
      });

  }


}





    // let apiUrl = 'api/owner';
    // this.repository.create(apiUrl, owner)
    //   .subscribe(res => {
    //     //this is temporary, until we create our dialogs
    //     this.location.back();
    //   },
    //     (error => {
    //       //temporary as well
    //       this.location.back();
    //     })
    //   )



  // guardarEmpleado() {
  //   return this.auth.registerUser(this.model.email, '123456')
  //     .then((idUsuario) => {
  //       console.log(idUsuario.user.uid);
  //       console.log('USUARIO CREADO');

  //       let usuarioNuevo: Iusuario = {
  //         nombre: this.model.nombre,
  //         apellido: this.model.apellido,
  //         dni: this.model.documento,
  //         perfil: this.model.perfil,
  //         email: this.model.email,
  //         cuil: this.model.cuil,
  //         id: idUsuario.user.uid,
  //         foto: this.urlfoto
  //       }
  //       console.log(usuarioNuevo);
  //       if (this.urlfoto) {
  //         this.usuarioProvider.guardarUsuario(usuarioNuevo);
  //       }
  //       else {
  //         this.usuarioProvider.guardarUsuarioConFoto(usuarioNuevo);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(this.usuarioProvider.errorAuth(error));
  //     });
  // }


