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
  // @Output() public estadoCambiado: EventEmitter<any>;
  @Output() public verMesa: EventEmitter<IMesa>;
  @Output() public asignarMesa: EventEmitter<IMesa>;
  @Output() public ver: EventEmitter<IMesa>;

  constructor(public _mesa: MesaService) {

    this.verMesa = new EventEmitter();
    this.asignarMesa = new EventEmitter();
    this.ver = new EventEmitter();
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

  seleccionarMesa() {
    this.verMesa.emit(this.mesa);
  }

  asignarCliente() {
    this.asignarMesa.emit(this.mesa);
  }

  verPedidos() {
    this.ver.emit(this.mesa);
  }

}
