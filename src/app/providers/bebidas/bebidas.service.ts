import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BebidasService {

  constructor(public afDB: AngularFireDatabase) { }

  traerBebidas(categoria: string) {
    return this.afDB
      .list("/bebidas/", ref => ref.orderByChild("categoria").equalTo(categoria))
      .valueChanges();
  }

  traerBebida(id: any): Promise<any> {
    let promesa = new Promise<any>((resolve, reject) => {
      this.afDB
        .list("/platos/", ref => ref.orderByChild("id").equalTo(id))
        .valueChanges()
        .subscribe(
          (bebida: any) => {
            if (bebida.length > 0) resolve(bebida[0]);
            else resolve(bebida);
          },
          err => {
            reject(err);
          }
        );
    });
    return promesa;
  }
}
