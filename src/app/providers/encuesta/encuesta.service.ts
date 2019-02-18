import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { IEncuesta } from 'src/app/clases/iencuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {


  constructor(public afDB: AngularFireDatabase) { }

  public guardarEncuesta(encuesta: IEncuesta) {
    return this.afDB.list("encuestas").push({
      mesa: encuesta.mesa,
      restaurant: encuesta.restaurant,
      mozo: encuesta.mozo,
      cocinero: encuesta.cocinero,
      comentario: encuesta.comentario
    });
  }

  public traerEncuestas() {
    return this.afDB.list<IEncuesta>('encuestas').valueChanges();
  }

}
