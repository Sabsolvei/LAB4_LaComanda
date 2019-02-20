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


    // if (event.estado === "Libre") {
    // Abrir comanda
    this.mesa = event;
    this.abrirComanda(event);
    // }
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
    this.auth.loadingOn();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    if (mesa.comanda == 0) {
      dialogConfig.data = {
        comanda: null,
        pedidoIndex: -1, // si viene por este lado, no tiene pedido creado
        mesa: mesa
      };

      const dialogRef = this.dialog.open(MenuCartaComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        this.auth.loadingOff();
        // console.log(`Dialog result: ${result}`);
      });
    } else {
      this._comanda.buscarComanda(mesa.comanda).then(com => {
        this.auth.loadingOff();
        this.mesa = mesa;
        this.comanda = com;

        dialogConfig.data = {
          comanda: com,
          pedidoIndex: -1, // si viene por este lado, no tiene pedido creado
          mesa: mesa
        };

        const dialogRef = this.dialog.open(MenuCartaComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.auth.loadingOff();
          console.log(`Dialog result: ${result}`);
        });

      });
    }
  }
}
