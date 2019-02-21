import { IComanda } from './../../clases/IComanda';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ICliente } from '../../clases/ICliente';
import { AuthProvider } from '../auth/auth';
import { Iusuario } from '../../clases/usuario';
import { UsuarioService } from '../usuarios/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    public afDB: AngularFireDatabase,
    private auth: AuthProvider,
    private usuarioProvider: UsuarioService
  ) { }


  registrar(cliente: ICliente) {
    return this.auth.registerUser(cliente.email, '123456')
      .then((idUsuario) => {
        // console.log(idUsuario.user.uid);
        // console.log('USUARIO CREADO');
        const usuarioNuevo: Iusuario =
        {
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          dni: cliente.dni,
          perfil: "Cliente",
          email: cliente.email,
          cuil: cliente.dni,
          id: idUsuario.user.uid
        }
        // console.log(usuarioNuevo);
        this.usuarioProvider.guardarUsuario(usuarioNuevo).then(() => {
          this.afDB
        .object("/clientes/" + cliente.dni)
        .update(cliente)
        .then(() => { });
        });
      })
      .catch(error => {
        console.log(this.usuarioProvider.errorAuth(error));
      });
  }


  buscarDNI(dni: string): Promise<ICliente> {

    const promesa = new Promise<ICliente>((resolve, reject) => {

      this.afDB
        .list("/clientes/", ref =>
          ref
            .orderByChild("dni")
            .equalTo(dni)
            .limitToFirst(1)
        )
        .valueChanges()
        .subscribe(
          (cli: any) => {
            if (cli.length > 0) {
              resolve(cli[0]);
            } else {
              resolve(null);
            }
          },
          err => {
            reject(err);
          }
        );
    });

    return promesa;
  }
}
