import { UsuarioService } from './../../providers/usuarios/usuario.service';
import { AuthProvider } from './../../providers/auth/auth';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";
import { Iusuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.scss']
})
export class AltaEmpleadoComponent implements OnInit {

  public options: FormGroup;
  public model: any = {};

  perfiles: any[] = [
    { value: 'mozo', viewValue: 'Mozo' },
    { value: 'bartender', viewValue: 'Bartender' },
    { value: 'cocinero', viewValue: 'Pastelero' },
    { value: 'cocinero', viewValue: 'Cocinero' },
    { value: 'cervecero', viewValue: 'Cervecero' },
    { value: 'admin', viewValue: 'Administrador' }
  ];


  constructor(
    private router: Router,
    private auth: AuthProvider,
    private usuarioProvider: UsuarioService) { }

  ngOnInit() {
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
          id: idUsuario.user.uid
        }
        console.log(usuarioNuevo);
        this.usuarioProvider.guardarUsuario(usuarioNuevo);
      })
      .catch(error => {
        console.log(this.usuarioProvider.errorAuth(error));
      });
  }

}
