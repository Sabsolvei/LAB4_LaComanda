import { Component, OnInit } from '@angular/core';
import { ICliente } from '../../../clases/ICliente';
import { ClienteService } from '../../../providers/cliente/cliente.service';
import { MesaService } from '../../../providers/mesa/mesa.service';

@Component({
  selector: 'app-asignar-cliente',
  templateUrl: './asignar-cliente.component.html',
  styleUrls: ['./asignar-cliente.component.scss']
})
export class AsignarClienteComponent implements OnInit {

public dniCliente: string;
public encontrado: boolean = false;
public buscado: boolean = false;
public cliente: ICliente= {
  nombre: "",
  apellido: "",
  dni: "",
  email: ""
};


public get cliEncontrado(): boolean {
  return this.cliEncontrado;
}

  constructor(public _cliente: ClienteService, public _mesa: MesaService) { }

  ngOnInit() {
  }

  asignar() {

  }

  registrar() {

  }
  cancelar() {

  }

  buscarCliente() {
    this.buscado = true;
    this._cliente.buscarDNI(this.dniCliente).then(cli => {
      console.log("CLIENTE");
      console.log(cli);
      if (cli != null) {
        this.encontrado = true;
        this.cliente = cli;
      } else {
        this.cliente = {
          nombre: "",
          apellido: "",
          dni: this.dniCliente,
          email: "",
          password: "123456"
        };

        this.encontrado = false;
      }
    }).catch(error=>console.log(error));
  }

}
