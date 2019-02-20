import { AuthProvider } from './../../providers/auth/auth';
import { EncuestaService } from './../../providers/encuesta/encuesta.service';
import { Component, OnInit } from '@angular/core';
import { IEncuesta } from 'src/app/clases/iencuesta';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  selected: number = 0;
  tabs = ['Mesa', 'Restaurant', 'Mozo', 'Cocinero', 'Comentario'];
  comentario: string = '';
  public encuesta: IEncuesta = {};
  constructor(
    public _encuesta: EncuestaService,
    public _auth: AuthProvider
  ) {
    // this.encuesta = { mesa: 0, restaurant: 0, mozo: 0, cocinero: 0 };
  }

  ngOnInit() {
  }

  public guardarPuntaje(puntaje: any) {

    switch (puntaje.tema) {
      case 'mesa':
        this.encuesta.mesa = puntaje.puntos;
        this.selected++;
        break;

      case 'restaurant':
        this.encuesta.restaurant = puntaje.puntos;
        this.selected++;
        break;

      case 'mozo':
        this.encuesta.mozo = puntaje.puntos;
        this.selected++;
        break;

      case 'cocinero':
        this.encuesta.cocinero = puntaje.puntos;
        this.selected++;
        break;

      case 'comentario':
        this.encuesta.comentario = puntaje.puntos;
        break;
    }
  }

  public enviarEncuesta() {
    this._auth.loadingOn();
    if (this.encuesta.mesa > 0 && this.encuesta.restaurant > 0 && this.encuesta.mozo > 0 && this.encuesta.cocinero > 0) {
      this.encuesta.comentario = this.comentario;
      console.log(this.encuesta);
      this._encuesta.guardarEncuesta(this.encuesta).then(()=> {
        this._auth.loadingOff();
      });
    }
  }

}
