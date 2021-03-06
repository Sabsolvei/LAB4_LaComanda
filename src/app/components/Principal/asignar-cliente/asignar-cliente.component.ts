import { Component, OnInit, Inject } from '@angular/core';
import { ICliente } from '../../../clases/ICliente';
import { ClienteService } from '../../../providers/cliente/cliente.service';
import { MesaService } from '../../../providers/mesa/mesa.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMesa } from 'src/app/clases/IMesa';
import { ComandasService } from '../../../providers/comandas/comandas.service';

@Component({
  selector: 'app-asignar-cliente',
  templateUrl: './asignar-cliente.component.html',
  styleUrls: ['./asignar-cliente.component.scss']
})
export class AsignarClienteComponent implements OnInit {

  public dniCliente: string;
  public encontrado: boolean = false;
  public buscado: boolean = false;
  public mesa: IMesa;
  public asignado: boolean = false;

  public cliente: ICliente = {
    nombre: "",
    apellido: "",
    dni: "",
    email: ""
  };


  public get cliEncontrado(): boolean {
    return this.cliEncontrado;
  }

  constructor(
    private dialogRef: MatDialogRef<AsignarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _cliente: ClienteService,
    public _mesa: MesaService,
    public _comanda: ComandasService) {
    this.mesa = data.mesa;
  }

  ngOnInit() {
  }

  asignar() {
    this.mesa.clienteDni = this.cliente.dni;
    this.mesa.clienteNombre = this.cliente.nombre;
    this.mesa.estado = 'Esperando';

    this._mesa.actualizarMesa(this.mesa).then(() => {

      if (this.mesa.comanda > 0) {
        this._comanda.buscarComanda(this.mesa.comanda).then(c => {
          c.clienteId = this.mesa.clienteDni;
          c.nombreCliente = this.mesa.clienteNombre;
          this._comanda.actualizarComanda(c).then(() => this.asignado = true);
        });
      } else {
        this.asignado = true;
      }
    });
  }

  registrar() {
    this.cliente.dni = this.dniCliente;
    this._cliente.registrar(this.cliente).then(() => this.asignar());
  }
  cancelar() {

  }

  buscarCliente() {
    this.buscado = true;
    this._cliente.buscarDNI(this.dniCliente).then(cli => {
      if (cli != null) {
        this.encontrado = true;
        this.cliente = cli;
      } else {
        this.encontrado = false;
      }
    }).catch(error => console.log(error));
  }

}
