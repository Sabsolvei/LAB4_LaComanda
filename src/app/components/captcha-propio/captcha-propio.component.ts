import { Captcha } from './../../clases/captcha';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-captcha-propio',
  templateUrl: './captcha-propio.component.html',
  styleUrls: ['./captcha-propio.component.scss']
})
export class CaptchaPropioComponent implements OnInit {

  @Output() cerrarCaptcha: EventEmitter<any> = new EventEmitter<any>();
  @Output() enviarResultado: EventEmitter<any> = new EventEmitter<any>();
  nuevoCaptcha: Captcha;
  // Tiempo: number;
  repetidor: any;
  private subscription: Subscription;

  ngOnInit() {
    this.CrearNuevoCaptcha();
  }

  constructor() {
    this.nuevoCaptcha = new Captcha();
    // this.Tiempo = -1;
    console.info("Inicio agilidad");
  }

  cerrar() {
    this.cerrarCaptcha.emit();
  }

  guardarRespuesta(rta: number) {
    this.nuevoCaptcha.numeroIngresado = rta;
    this.verificar();
  }

  CrearNuevoCaptcha() {
    // this.Tiempo = 10;
    this.nuevoCaptcha.generarOperacion();
    // this.repetidor = setInterval(() => {
    //   this.Tiempo--;
    //   if (this.Tiempo == 0) {
    //     clearInterval(this.repetidor);
    //     this.verificar();
    //   }
    // }, 900);
  }

  verificar() {
    // this.Tiempo = 0;
    // clearInterval(this.repetidor);
    this.nuevoCaptcha.verificar();
    if (this.nuevoCaptcha.gano == false) {
      this.CrearNuevoCaptcha();
    }
    else {
      this.enviarResultado.emit(true);
    }


  }

}
