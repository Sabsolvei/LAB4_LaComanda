import { IComanda } from './../../clases/IComanda';
import { Subscription } from 'rxjs';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';
import { Component, OnInit } from '@angular/core';
import { ComandasService } from 'src/app/providers/comandas/comandas.service';
import { MesaService } from 'src/app/providers/mesa/mesa.service';
import { IMesa } from 'src/app/clases/IMesa';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.scss']
})
export class ConsultaClienteComponent implements OnInit {

  public perfil: string;
  public pedidos: IComandaPedido[];
  public comanda: IComanda;
  public mesa: IMesa;
  public comandaSubscription: Subscription;
  public comandas: any;
  //  =
  //   [
  //     { "id": 1, "estado": "derivado", "tiempoMayorEstimado": 20, "codigoPedido": "CD423", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 333104 }, { "cantidad": 2, "bebidaID": 333104 }] } }
  //   ];

  constructor(
    public _comanda: ComandasService,
    public _mesa: MesaService
  ) { }

  ngOnInit() {
    this.perfil = localStorage.getItem('perfil');
    if (this.perfil) {
      this.comandaSubscription = this._comanda.comandasAbiertas.valueChanges().subscribe((data: IComanda[][]) => {
        this.comandas = data;
        this.traerComandaYMesa();
      });
    }
  }

  traerComandaYMesa() {

    for (let i = 0; i < this.comandas.length; i++) {
      this._comanda.verificarComandaPorUsuario(this.comandas[i].id)
        .then((c) => {
          if (c) {
            this._mesa.traerMesa(c.mesa).then((m) => {
              this.mesa = m;
              this.comanda = c;
            });
          }
        });
      if (this.comanda) {
        console.log("ENCONTRÓ");
        break;
      }
    }
  }

  ngOnDestroy() {
    this.comandaSubscription.unsubscribe();
  }

  traerComanda() {

  }

}
