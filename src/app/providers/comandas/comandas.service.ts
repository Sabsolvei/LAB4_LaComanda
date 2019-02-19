import { AngularFireList } from 'angularfire2/database';
import { MesaService } from './../mesa/mesa.service';
import { IComanda } from './../../clases/IComanda';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { IMesa } from 'src/app/clases/IMesa';

@Injectable({
  providedIn: 'root'
})
export class ComandasService {
  public lista: AngularFireList<IComanda>;
  public comandasAbiertas: AngularFireList<IComanda[]>;

  //public items: Observable<any[]>;
  //public subs: Subscription = null;

  constructor(
    public afDB: AngularFireDatabase,
    public _mesas: MesaService
  ) {
    this.lista = this.afDB.list("/mesa_comandas");
    this.comandasAbiertas = this.afDB.list("/mesa_comandas", ref =>
      ref.orderByChild("estado").equalTo("Abierta")
    );

  }

  /** Guarda una comanda */
  public saveComanda(comanda: IComanda, mesa: IMesa, mesaKey: string): Promise<any> {
    //let userID: String = localStorage.getItem("userID");
    //let fecha: Date = new Date();
    //let fechaS: String;

    //primero guaro la imagen para obtener la URL, y colocarla como campo en la encuesta
    let promesa = new Promise((resolve, reject) => {
      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString(); // 1231231231

      if (comanda.fotoCliente != "") {
        try {
          // Si tiene una imagen, la guardo y la asigno a la comanda
          let uploadTask: firebase.storage.UploadTask = storeRef
            .child(`comandas/${nombreArchivo}`)
            .putString(comanda.fotoCliente, "base64", {
              contentType: "image/jpeg"
            });

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            () => { }, // saber el % de cuantos Mbs se han subido
            error => {
              // manejo de error
              reject();
            },
            () => {
              // Tomo la URL
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                this.guardarComanda(comanda, mesa, mesaKey, url);
              });

              resolve();
            }
          );
        } catch {
          this.guardarComanda(comanda, mesa, mesaKey, comanda.fotoCliente);
          resolve();
        }
      } else {
        //No tiene imagen

        this.guardarComanda(comanda, mesa, mesaKey).then(
          (resultado: Boolean) => {
            if (resultado) resolve();
            else reject();
          },
          () => {
            reject();
          }
        );
      }
    });

    return promesa;
  }

  // actualizarComanda(comanda: IComanda): Promise<Boolean> {
  //   let promesa = new Promise<Boolean>((resolve, reject) => {
  //     //Me devuelve una referencia al objeto de la lista, asi me aseguro de Updatear y no generar una nueva Comanda

  //     this.subs = this.items.subscribe(data => {
  //       for (let i = 0; i < data.length; i++) {
  //         if (data[i].id == comanda.id) {
  //           let ref = firebase.database().ref("/mesa_comandas/" + data[i].key);

  //           ref.ref.update(comanda).then(
  //             () => {
  //               resolve(true);
  //             },
  //             err => {
  //               reject(false);
  //             }
  //           );

  //           break;
  //         }
  //       }
  //     });
  //   });

  //   return promesa;
  // }

  public actualizarComanda(comanda: IComanda): Promise<Boolean> {
    const promesa = new Promise<Boolean>((resolve, reject) => {
      // Me devuelve una referencia al objeto de la lista, asi me aseguro de Updatear y no generar una nueva Comanda

      console.log("ActualizarComanda");
      console.log(comanda);
      this.afDB
        .object("/mesa_comandas/" + comanda.id)
        .update(comanda)
        .then(() => resolve(true))
        .catch(err => reject(err));
    });

    return promesa;
  }

  private guardarComanda(
    comanda: IComanda,
    mesa: IMesa,
    mesaKey: string,
    url?: string
  ): Promise<Boolean> {
    if (url != null) comanda.fotoCliente = url; // Si tiene URL se la asigno

    let promesa = new Promise<Boolean>((resolve, reject) => {
      this.afDB
        .object("/mesa_comandas/" + comanda.id)
        .update(comanda)
        .then(
          () => {
            //CAMBIO EL ESTADO DE LA MESA A OCUPADA

            let ref = firebase.database().ref("/mesas/" + mesaKey);

            ref.ref.update({ estado: "Ocupada", comanda: comanda.id }).then(
              () => {
                resolve(true);
              },
              err => {
                reject(false);
              }
            );
          },
          err => {
            reject(false);
          }
        );

      // // this.lista.push(comanda).then(
      // //   () => {
      // //     //CAMBIO EL ESTADO DE LA MESA A OCUPADA

      // //     let ref = firebase.database().ref("/mesas/" + mesaKey);

      // //     ref.ref.update({ estado: "Ocupada", comanda: comanda.id }).then(
      // //       () => {
      // //         resolve(true);
      // //       },
      // //       err => {
      // //         reject(false);
      // //       }
      // //     );
      // //   },
      // //   err => {
      // //     reject(false);
      // //   }
      // // );
    });

    return promesa;
  }

  public buscarComandas() {
    return this.lista;
  }

  buscarComanda(idComanda: number): Promise<IComanda> {

    return new Promise<IComanda>((resolve, reject) => {

      const obs = this.afDB
        .object("/mesa_comandas/" + idComanda.toString())
        .valueChanges().subscribe((com: IComanda) => {
          resolve(com);
        });

      setTimeout(() => {
        obs.unsubscribe();
      }, 500);

    });
  }

  public verificarComandaPorUsuario(comandaID: number): Promise<IComanda> {
    const promesa = new Promise<IComanda>((resolve, reject) => {
      const userID: string = localStorage.getItem("userID");
      const userDni: string = localStorage.getItem("userDni");

      let encontro: boolean = false;

      let subs = this.lista.valueChanges().subscribe(
        (comandas: IComanda[]) => {
          for (let i = 0; i < comandas.length; i++) {
            if (comandas[i].id == comandaID) {
              if (
                comandas[i].mozoId == userID ||
                comandas[i].clienteId == userDni
              ) {
                resolve(comandas[i]);
                encontro = true;
                break;
              }
            }
          }

          if (!encontro) {
            // no le pertenece la Comanda al usuario
            resolve(null);
          }
        },
        err => {
          reject(err);
        }
      );

      setTimeout(() => {
        subs.unsubscribe();
      }, 2000);
    });
    return promesa;
  }

  public cerrarComanda(comanda: IComanda, mesa: IMesa): Promise<Boolean> {
    const promesa = new Promise<Boolean>((resolve, reject) => {
      this.actualizarComanda(comanda).then((actualizo: Boolean) => {
        if (actualizo) {
          mesa.clienteDni = "";
          mesa.clienteNombre = "";
          mesa.estado = "Libre";
          mesa.comanda = 0;

          this.afDB
            .object("/mesas/" + mesa.idMesa)
            .update(mesa)
            .then(() => {
              resolve(true);
            })
            .catch(err => reject(err));
        } else {
          reject();
        }
      });
    });
    return promesa;
  }

  public guardarPropina(comanda: IComanda): Promise<Boolean> {
    let promesa = new Promise<Boolean>((resolve, reject) => {
      this.actualizarComanda(comanda)
        .then(
          (actualizo: Boolean) => {
            if (actualizo) {
              resolve(true);
            }
          }),
        err => {
          reject(err);
        }
    });
    return promesa;
  }

  public pedirCuenta(mesaKey: string): Promise<Boolean> {
    let promesa = new Promise<Boolean>((resolve, reject) => {
      let ref = firebase.database().ref("/mesas/" + mesaKey);
      ref.ref.update({ estado: "Esperando cobro" }).then(
        () => {
          resolve(true);
        },
        err => {
          reject(false);
        }
      );
    });
    return promesa;
  }
}
