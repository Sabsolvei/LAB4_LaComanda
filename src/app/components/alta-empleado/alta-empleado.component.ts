import { usuario } from './../../clases/usuario';
import { UsuarioService } from './../../providers/usuarios/usuario.service';
import { AuthProvider } from './../../providers/auth/auth';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";

import { Iusuario } from 'src/app/clases/usuario';
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

  public urlfoto: string;
  public realFile: any;

  constructor(
    private router: Router,
    private auth: AuthProvider,
    public storage: AngularFireStorage,
    private usuarioProvider: UsuarioService) { }

  ngOnInit() {
  }


  guardarEmpleado() {
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
