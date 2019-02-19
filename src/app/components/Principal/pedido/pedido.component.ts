import { Component, OnInit, Input, Inject } from '@angular/core';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';
import { IComanda } from 'src/app/clases/IComanda';
import { ComandasService } from '../../../providers/comandas/comandas.service';
import { MatSnackBar, MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMesa } from 'src/app/clases/IMesa';
import { MenuCartaComponent } from '../../menu-carta/menu-carta.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  // private pedido: IComandaPedido;
  @Input() public comanda: IComanda;
  @Input() public mesa: IMesa;
  @Input() public index: number;

  constructor(private _comanda: ComandasService
    , private snackBar: MatSnackBar
    , public dialog: MatDialog) {

  }

  ngOnInit() {

  }

  sumarMinutos() {
    // hora actual - (derivado + tiempo)
    let derivadoMili: number;
    const derivado = new Date(this.comanda.pedidos[this.index].horaDerivado);
    const actual = new Date().getTime();

    derivadoMili = new Date(derivado.getTime() + this.comanda.pedidos[this.index].tiempoMayorEstimado * 60000).getTime();

    let diff =(derivadoMili - actual) / 1000;
    diff = diff / 60;

    return Math.floor(diff % 60);
  }

  derivar() {
    this.comanda.pedidos[this.index].estado = "Derivado";
    this.comanda.pedidos[this.index].horaDerivado = new Date().valueOf();

    this._comanda.actualizarComanda(this.comanda).then(() => {
      this.openSnackBar("El pedido fue derivado" , "");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  eliminar() {
    const dialogRef = this.dialog.open(ConfirmacionDialog, {
      data: {pedido: this.comanda.pedidos[this.index].codigoPedido}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

        this.comanda.importeTotal -= this.comanda.pedidos[this.index].subTotal;
        this.comanda.pedidos.splice(this.index, 1);
        this.actualizarComanda();
      }
    });
  }

  actualizarComanda() {
    this._comanda.actualizarComanda(this.comanda).then(() => {
      this.openSnackBar("El pedido fue eliminado" , "");
    });
  }

  editar() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      comanda: this.comanda,
      pedidoIndex: this.index,
      mesa: this.mesa
    };

    const dialogRef = this.dialog.open(MenuCartaComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
      });
  }

  entregar() {
    this.comanda.pedidos[this.index].estado = "Entregado";

    this._comanda.actualizarComanda(this.comanda).then(() => {
      this.openSnackBar("El pedido fue entregado" , "");
    });
  }

  verBotones(): boolean {
    const perfil = localStorage.getItem('perfil');

    if (perfil == "Cliente") {
      return false;
    } else {
      return true;
    }
  }


}

@Component({
  selector: 'confirmacion-dialog',
  templateUrl: 'confirmacion.html'
})
export class ConfirmacionDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {pedido: string}) {}
}
