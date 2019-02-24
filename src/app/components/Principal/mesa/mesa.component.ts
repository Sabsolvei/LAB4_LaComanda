import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMesa } from 'src/app/clases/IMesa';
import { MesaService } from '../../../providers/mesa/mesa.service';
import { Observable } from 'rxjs';

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
  public mesaSelec: number;

  public mesaSeleccionada$: Observable<number>;

  constructor(public _mesa: MesaService) {

    this.cargarPedido = new EventEmitter();
    this.asignarMesa = new EventEmitter();
    this.verComanda = new EventEmitter();
  }

  ngOnInit() {
    this.mesaSeleccionada$ = this._mesa.numeroSeleccionado;
    // this.mesaSeleccionada$.subscribe((nro) => { 
    //   this.mesaSelec = nro; 

    //   if (this.mesa.numero == nro) {
    //     console.log("MESA!");
    //     console.log(this.mesaSelec);
    //   }
    // });

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
        es = "white";
        break;
      // case "Comiendo":
      //   es = "#ec6990";
      //   break;
      case "Esperando":
        es = "#FCE155";
        break;
      case "Comiendo":
        es = "#90ABD7";
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
    console.log("PASAR NRO MESA AL OBSERVABLE");
    this._mesa.seleccionarMesa(this.mesa.numero);
    this.mesaSeleccionada$.subscribe((nro) =>
     { 
       this.mesaSelec = nro;
       console.log(this.mesaSelec);
     });

    this.verComanda.emit(this.mesa);
  }

}
