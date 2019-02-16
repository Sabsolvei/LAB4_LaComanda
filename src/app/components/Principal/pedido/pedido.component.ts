import { Component, OnInit, Input } from '@angular/core';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';
import { IComanda } from 'src/app/clases/IComanda';
import { ComandasService } from '../../../providers/comandas/comandas.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  // private pedido: IComandaPedido;
  @Input() public comanda: IComanda;
  @Input() public index: number;

  constructor(private _comanda: ComandasService, private snackBar: MatSnackBar) {

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

  entregar() {

  }
}
