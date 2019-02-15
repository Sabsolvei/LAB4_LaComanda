import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';

@Component({
  selector: 'app-pedido-sector',
  templateUrl: './pedido-sector.component.html',
  styleUrls: ['./pedido-sector.component.scss']
})
export class PedidoSectorComponent implements OnInit {

  @Input() public itemPedido: any;
  @Output() estadoCambiado = new EventEmitter<any>();
  perfil: string = "";

  constructor() {
  }

  ngOnInit() {
    console.log("PEDIDO - " + this.itemPedido.estadosubPedidosCocina);
    console.log(this.itemPedido);
  }

  sumarMinutos() {
    let derivadoMili: number = 0;
    let derivado = new Date(this.itemPedido.horaDerivado);
    let actual = new Date().getTime();
    derivadoMili = new Date(derivado.getTime() + this.itemPedido.tiempoEstimado * 60000).getTime();
    var diff = (derivadoMili - actual) / 1000;
    diff = diff / 60;
    return Math.floor(diff % 60);
  }

  cambiarEstado(estado: string) {
    console.log("CAMBIAR ESTADO A EN PREPARACION");
    console.log(estado);
    console.log(this.itemPedido);
    this.estadoCambiado.emit({ estadoPedido: estado, idComanda: this.itemPedido.comandaID, idPedido: this.itemPedido.id });
  }

}
