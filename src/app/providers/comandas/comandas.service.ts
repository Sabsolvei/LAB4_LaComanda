import { IComanda } from './../../clases/IComanda';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComandasService {

  constructor(
    public afDB: AngularFireDatabase
  ) { }

  public actualizarComanda(comanda: IComanda): Promise<Boolean> {
    let promesa = new Promise<Boolean>((resolve, reject) => {
      // Me devuelve una referencia al objeto de la lista, asi me aseguro de Updatear y no generar una nueva Comanda

      this.afDB
        .object("/Mesa_Comandas/" + comanda.id)
        .update(comanda)
        .then(() => resolve(true))
        .catch(err => reject(err));
    });

    return promesa;
  }

}
