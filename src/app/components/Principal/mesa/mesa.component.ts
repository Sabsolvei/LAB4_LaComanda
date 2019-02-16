import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMesa } from 'src/app/clases/IMesa';
import { MesaService } from '../../../providers/mesa/mesa.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {
  @Input() public mesa: IMesa;
  @Input() public estado: string;

  @Output() public cargarPedido: EventEmitter<IMesa>;
  @Output() public asignarMesa: EventEmitter<IMesa>;
  @Output() public verComanda: EventEmitter<IMesa>;

  constructor(public _mesa: MesaService) {

    this.cargarPedido = new EventEmitter();
    this.asignarMesa = new EventEmitter();
    this.verComanda = new EventEmitter();
  }

  ngOnInit() {
  }

  cambiarNombreBoton(): string {
    let es: string;

    switch (this.mesa.estado) {
      case "Libre":
        es = "book";
        break;
      case "Comiendo":
      case "Esperando":
      es = "search";
      break;
      case "Comiendo":
        es = "Ver comanda";
        break;
    }

    return es;
  }

  tomarColor() {
    let es: string;

    switch (this.mesa.estado) {
      case "Libre":
        es = "#a9ec89";
        break;
      case "Comiendo":
        es = "#ec6990";
        break;
      case "Esperando":
        es = "#f5ed79";
        break;
      case "Comiendo":
        es = "Ver comanda";
        break;
    }

    return es;
  }

  agregarPedido() {
    this.cargarPedido.emit(this.mesa);
  }

  asignarCliente() {
    this.asignarMesa.emit(this.mesa);
  }

  verPedidos() {
    this.verComanda.emit(this.mesa);
  }

}
