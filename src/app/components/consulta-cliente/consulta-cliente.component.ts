import { IComandaPedido } from 'src/app/clases/IComandaPedido';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.scss']
})
export class ConsultaClienteComponent implements OnInit {

  public pedidos: IComandaPedido[] =
    [
      { "id": 1, "estado": "derivado", "tiempoMayorEstimado": 20, "codigoPedido": "CD423", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 333104 }, { "cantidad": 2, "bebidaID": 333104 }] } }
    ];



  constructor() { }

  ngOnInit() {
  }

}
