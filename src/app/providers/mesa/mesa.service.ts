import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IMesa } from '../../clases/IMesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(public afDB: AngularFireDatabase) { }


  traerMesas() {
    return this.afDB.list('/mesas/').valueChanges();
  }

  public actualizarMesa(mesa: IMesa): Promise<Boolean> {
    const promesa = new Promise<Boolean>((resolve, reject) => {

      this.afDB
        .object("/mesas/" + mesa.idMesa)
        .update(mesa)
        .then(() => resolve(true))
        .catch(err => reject(err));
    });

    return promesa;
  }
}
