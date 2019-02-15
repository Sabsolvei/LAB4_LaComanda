import { Component, OnInit } from '@angular/core';
import { ICliente } from '../../../clases/ICliente';
import { ClienteService } from '../../../providers/cliente/cliente.service';

@Component({
  selector: 'app-asignar-cliente',
  templateUrl: './asignar-cliente.component.html',
  styleUrls: ['./asignar-cliente.component.scss']
})
export class AsignarClienteComponent implements OnInit {

public dniCliente: string;
public encontrado: boolean = false;
public cliente: ICliente;


public get cliEncontrado(): boolean {
  return this.cliEncontrado;
}

  constructor(public _cliente: ClienteService) { }

  ngOnInit() {
  }

  asignar() {

  }

  cancelar() {

  }

  buscarCliente() {
    this._cliente.buscarDNI(this.dniCliente).then(cli => {
      if (cli != null) {
        this.encontrado = true;
        this.cliente = cli;
      } else {
        this.encontrado = false;
        this.cliente = null;
      }
    });
  }

}
