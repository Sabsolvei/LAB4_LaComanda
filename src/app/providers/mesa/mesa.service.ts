import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IMesa } from '../../clases/IMesa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(public afDB: AngularFireDatabase) { }


  traerMesas(): Observable<{}[]> {
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

  // **Busca la mesa por ID, y devuelve una promesa con el Numero */
  buscarNroMesa(idMesa: number): Promise<string> {

    return new Promise<string>((resolve, reject) => {

      this.afDB
        .list("/mesas/", ref => ref.orderByChild("idMesa").equalTo(idMesa))
        .valueChanges().subscribe((data: IMesa[]) => {
          if (data.length > 0) { //encontro una mesa
            resolve(data[0].numero.toString());
          } else {
            resolve("");
          }
        })
    })
  }


}
