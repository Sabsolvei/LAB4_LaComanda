import { MesaService } from 'src/app/providers/mesa/mesa.service';
import { IProducto } from './../../clases/IProducto';
import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition
// } from '@angular/animations';
import { IMesa } from 'src/app/clases/IMesa';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MenuCartaComponent } from '../menu-carta/menu-carta.component';
import { AuthProvider } from '../../providers/auth/auth';
import { AsignarClienteComponent } from '../Principal/asignar-cliente/asignar-cliente.component';
import { IComanda } from '../../clases/IComanda';
import { ComandasService } from '../../providers/comandas/comandas.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']

})
export class MesasComponent implements OnInit {
  @Output() prueba: EventEmitter<any> = new EventEmitter<any>();

  tiempo: number;
  repetidor: any;
  public comanda: IComanda = null;
  public mesa: IMesa = null;
  public mesas: IMesa[] = [];

  ngOnInit() {
  }

  constructor(
    public _mesa: MesaService,
    private _comanda: ComandasService,
    public dialog: MatDialog,
    public auth: AuthProvider
  ) {
    this.tiempo = -1;
    _mesa.traerMesas().subscribe((data: IMesa[]) => {
      this.mesas = data;
    });
  }

  cargarPedido(event: IMesa) {
    if (event.estado === "Libre") {
      // Abrir comanda
      this.mesa = event;
      this.abrirComanda(event);
    }
  }

  verComanda(mesa: IMesa) {
    this.buscarComanda(mesa);
  }

  buscarComanda(mesa: IMesa) {
    this._comanda.buscarComanda(mesa.comanda).then(com => {
      this.mesa = mesa;
      this.comanda = com;
    });
  }

  asignarMesa(mesa: IMesa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      mesa: mesa
    };
    const dialogRef = this.dialog.open(AsignarClienteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  abrirComanda(mesa: IMesa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      comandaID: mesa.comanda,
      pedidoID: 0, // si viene por este lado, no tiene pedido creado
      mesa: mesa
    };
    const dialogRef = this.dialog.open(MenuCartaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


  // public abrirMenuCarta() {
  //   this.router.navigate(['/menu-carta']);
  // }

  // getClass(estado: string): string | any {
  //   let clases = [];

  //   if (estado) {

  //     switch (estado) {
  //       case 'ocupada':
  //         clases.push("mat-elevation-z0", "aunNoJugoClass");

  //         break;

  //       case 'libre':
  //         clases.push("mat-elevation-z0", "correctoClass");
  //         break;

  //       case 'comiendo':
  //         clases.push("mat-elevation-z0", "errorClass");
  //         break;

  //       case 'esperando':
  //         clases.push("mat-elevation-z0", "pasapalabraClass");
  //         break;
  //     }
  //     //return this.sanitizer.bypassSecurityTrustStyle(estilo);
  //   }
  //   return clases;
  // }


  //   [
  //     { "idMesa": 1, "numero": 1, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "cerrada", "comanda": 1 },
  //     { "idMesa": 2, "numero": 2, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "comiendo", "comanda": 1 },
  //     { "idMesa": 3, "numero": 3, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "comiendo", "comanda": 1 },
  //     { "idMesa": 4, "numero": 4, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "cerrada", "comanda": 1 },
  //     { "idMesa": 5, "numero": 5, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "comiendo", "comanda": 1 },
  //     { "idMesa": 6, "numero": 6, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "pagando", "comanda": 1 },
  //     { "idMesa": 7, "numero": 7, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "libre", "comanda": 0 },
  //     { "idMesa": 8, "numero": 8, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "comiendo", "comanda": 1 },
  //     { "idMesa": 9, "numero": 9, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "comiendo", "comanda": 1 },
  //     { "idMesa": 10, "numero": 10, "capacidad": '6', "codigoQr": 'AB123', "tipo": "normal", "estado": "libre", "comanda": 0 },
  //     { "idMesa": 11, "numero": 11, "capacidad": '4', "codigoQr": 'AC123', "tipo": "discapacitados", "estado": "esperando", "comanda": 1 },
  //     { "idMesa": 12, "numero": 12, "capacidad": '2', "codigoQr": 'AC123', "tipo": "vip", "estado": "pagando", "comanda": 1 },
  //   ];

  // public pedidos: IComandaPedido[] =
  //   [
  //     { "id": 1, "estado": "derivado", "tiempoMayorEstimado": 20, "codigoPedido": "CD423", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 333104 }, { "cantidad": 2, "bebidaID": 333104 }] } },
  //     { "id": 1, "estado": "preparado", "tiempoMayorEstimado": 10, "codigoPedido": "TS543", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 480844 },{ "cantidad": 2, "bebidaID": 480844 },{ "cantidad": 2, "bebidaID": 480844 }] } },
  //     { "id": 1, "estado": "pendiente", "tiempoMayorEstimado": 18, "codigoPedido": "AG543", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 4366576 },{ "cantidad": 2, "bebidaID": 4366576 }] } }
  //   ];
