import { Component, OnInit, Input } from '@angular/core';
import { IComanda } from 'src/app/clases/IComanda';
import { IMesa } from 'src/app/clases/IMesa';
import { ComandasService } from '../../../providers/comandas/comandas.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ver-comanda',
  templateUrl: './ver-comanda.component.html',
  styleUrls: ['./ver-comanda.component.scss']
})
export class VerComandaComponent implements OnInit {

  @Input() public comanda: IComanda;
  @Input() public mesa: IMesa;

  constructor(private _comanda: ComandasService, private snackBar: MatSnackBar) { 
    
  }

  ngOnInit() {
  }

  cerrarComanda() {
    this.comanda.estado = "Cerrada";

    this._comanda.cerrarComanda(this.comanda, this.mesa).then( () => {
      this.comanda = null;
      this.mesa = null;
      this.openSnackBar("La comanda fue cerrada", " ");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  habilitarBoton(): boolean {
    let deshabilitar: boolean = false;

    this.comanda.pedidos.forEach(pedido => {
      if (pedido.estado != "Entregado") {
        deshabilitar = true;
      }
    });

    return deshabilitar;
  }

}
