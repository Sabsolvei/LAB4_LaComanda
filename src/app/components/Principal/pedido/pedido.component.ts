import { Component, OnInit, Input } from '@angular/core';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  @Input() public pedido: IComandaPedido; 

  constructor() { }

  ngOnInit() {
  }

}
