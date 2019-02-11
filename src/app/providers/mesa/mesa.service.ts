import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(public afDB: AngularFireDatabase) { }


  traerMesas() {
    return this.afDB.list('/mesas/').valueChanges();
  }
}
