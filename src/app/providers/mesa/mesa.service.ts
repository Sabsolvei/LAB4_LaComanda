import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IMesa } from 'src/app/clases/IMesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(public afDB: AngularFireDatabase) { }


  traerMesas() {
    return this.afDB.list('/mesas/').valueChanges();
  }

  //**Busca la mesa por ID, y devuelve una promesa con el Numero */
  buscarNroMesa(idMesa: number): Promise<string> {

    return new Promise<string>((resolve, reject) => {

      this.afDB
        .list("/mesas/", ref => ref.orderByChild("idMesa").equalTo(idMesa))
        .valueChanges().subscribe((data: IMesa[]) => {
          if (data.length > 0) { //encontro una mesa
            console.log(data[0].numero.toString());
            resolve(data[0].numero.toString());
          } else {
            resolve("");
          }
        })
    })
  }


}
