import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  constructor(public afDB: AngularFireDatabase) { }


  traerPlatos(categoria: string) {
    return this.afDB
      .list("/platos/", ref => ref.orderByChild("categoria").equalTo(categoria))
      .valueChanges();
  }

  traerPlato(id: any): Promise<any> {
    // console.log("ID PLATO A BUSCAR");
    // console.log(id);
    let promesa = new Promise<any>((resolve, reject) => {
      this.afDB
        .list("/platos/", ref => ref.orderByChild("id").equalTo(id))
        .valueChanges()
        .subscribe(
          (plato: any) => {
            // console.log("PLATO ENCONTRADA");
            // console.log(plato);
            if (plato.length > 0) resolve(plato[0]);
            else resolve(plato);
          },
          err => {
            reject(err);
          }
        );
    });
    return promesa;
  }

}