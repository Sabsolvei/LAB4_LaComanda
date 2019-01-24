import { IProducto } from './../../clases/IProducto';
import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { IMesa } from 'src/app/clases/IMesa';
import { IComandaPedido } from 'src/app/clases/IComandaPedido'




@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss'],
  animations: [
    trigger('buttonState', [
      state('inactive', style({ transform: 'translateX(0) scale(1)' })),
      state('active', style({ transform: 'translateX(0) scale(1)' })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('200ms ease-out')),
      transition('void => inactive', [
        style({ transform: 'translateX(-100%) scale(1)' }),
        animate(100)
      ]),
      transition('inactive => void', [
        animate(100, style({ transform: 'translateX(100%) scale(1)' }))
      ]),
      transition('void => active', [
        style({ transform: 'translateX(0) scale(0)' }),
        animate(200)
      ]),
      transition('active => void', [
        animate(200, style({ transform: 'translateX(0) scale(0)' }))
      ])
    ])
  ]


})
export class MesasComponent implements OnInit {
  @Output() prueba: EventEmitter<any> = new EventEmitter<any>();

  tiempo: number;
  repetidor: any;


  public mesas: IMesa[] =
    [
      { "idMesa": 1, "numero": 1, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "cerrada", "comanda": 1 },
      { "idMesa": 2, "numero": 2, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "comiendo", "comanda": 1 },
      { "idMesa": 3, "numero": 3, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "comiendo", "comanda": 1 },
      { "idMesa": 4, "numero": 4, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "cerrada", "comanda": 1 },
      { "idMesa": 5, "numero": 5, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "comiendo", "comanda": 1 },
      { "idMesa": 6, "numero": 6, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "pagando", "comanda": 1 },
      { "idMesa": 7, "numero": 7, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "libre", "comanda": 0 },
      { "idMesa": 8, "numero": 8, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "comiendo", "comanda": 1 },
      { "idMesa": 9, "numero": 9, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "comiendo", "comanda": 1 },
      { "idMesa": 10, "numero": 10, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "libre", "comanda": 0 },
      { "idMesa": 11, "numero": 11, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "esperando", "comanda": 1 },
      { "idMesa": 12, "numero": 12, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "pagando", "comanda": 1 },
    ];

  public pedidos: IComandaPedido[] =
    [
      { "idComandaPedido": 1, "estado": "derivado", "tiempoMayorEstimado": 20, "codigoPedido": "CD423", "subPedidosBebida": { "idSubpedido": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "idProductoBebida": 333104 }, { "cantidad": 2, "idProductoBebida": 333104 }] } },
      { "idComandaPedido": 1, "estado": "preparado", "tiempoMayorEstimado": 10, "codigoPedido": "TS543", "subPedidosBebida": { "idSubpedido": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "idProductoBebida": 480844 },{ "cantidad": 2, "idProductoBebida": 480844 },{ "cantidad": 2, "idProductoBebida": 480844 }] } },
      { "idComandaPedido": 1, "estado": "pendiente", "tiempoMayorEstimado": 18, "codigoPedido": "AG543", "subPedidosBebida": { "idSubpedido": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "idProductoBebida": 4366576 },{ "cantidad": 2, "idProductoBebida": 4366576 }] } }
    ];


  ngOnInit() {
    setTimeout(() => {  //The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.

    }, 1)
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.tiempo = -1;

  }

  // enviarResultados() {
  //   this.enviarJuego.emit(this.nuevoJuego);
  // }

  NuevoJuego() {
    this.tiempo = 200;
    this.repetidor = setInterval(() => {

      this.tiempo--;
      if (this.tiempo == 0) {
        clearInterval(this.repetidor);
      }
    }, 900);
  }


  getClass(estado: string): string | any {
    let clases = [];

    if (estado) {

      switch (estado) {
        case 'ocupada':
          clases.push("mat-elevation-z0", "aunNoJugoClass");

          break;

        case 'libre':
          clases.push("mat-elevation-z0", "correctoClass");
          break;

        case 'comiendo':
          clases.push("mat-elevation-z0", "errorClass");
          break;

        case 'esperando':
          clases.push("mat-elevation-z0", "pasapalabraClass");
          break;
      }
      //return this.sanitizer.bypassSecurityTrustStyle(estilo);
    }
    return clases;
  }
}