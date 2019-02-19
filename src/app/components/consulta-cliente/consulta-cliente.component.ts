import { UsuarioService } from './../../providers/usuarios/usuario.service';
import { IComanda } from './../../clases/IComanda';
import { Subscription } from 'rxjs';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';
import { Component, OnInit } from '@angular/core';
import { ComandasService } from 'src/app/providers/comandas/comandas.service';
import { MesaService } from 'src/app/providers/mesa/mesa.service';
import { IMesa } from 'src/app/clases/IMesa';
import { Router } from '@angular/router';

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
  public fotoMozo: string = '';
  public nombreMozo: string = '';
  // public codigo: string = '';
  public codigoMesa: string;
  //  =
  //   [
  //     { "id": 1, "estado": "derivado", "tiempoMayorEstimado": 20, "codigoPedido": "CD423", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 333104 }, { "cantidad": 2, "bebidaID": 333104 }] } }
  //   ];

  constructor(
    public _comanda: ComandasService,
    public _mesa: MesaService,
    public _usuario: UsuarioService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.perfil = localStorage.getItem('perfil');

    if (this.perfil == 'Cliente') {
      this.comandaSubscription = this._comanda.comandasAbiertas.valueChanges().subscribe((data: IComanda[][]) => {
        this.comandas = data;
        this.traerComandaPorCliente();
      });
    }
  }

  public traerComandaPorCodigoMesa(codigoMesa: string) {
    this.codigoMesa = this.codigoMesa.toUpperCase();
    this._mesa.traerMesaPorCodigo(this.codigoMesa).then((mesa) => {
      this._comanda.buscarComanda(mesa.comanda).then((comanda) => {
        this.traerMozoAsociado(comanda.mozoId).then(() => {
          this.mesa = mesa;
          this.comanda = comanda;
        });
      });
    });
  }

  public llamarMozo() {
    this.mesa.estado = 'Llamando';
    this._mesa.actualizarMesa(this.mesa).then((respuesta) => {
      if (respuesta) {
        console.log("EL MOZO VENDRA EN UNOS MINUTOS");
      }
    });
  }

  public pagar() {
    this.mesa.estado = 'Cobrar';
    this._mesa.actualizarMesa(this.mesa).then((respuesta) => {
      if (respuesta) {
        console.log("EL MOZO VENDRA EN UNOS MINUTOS");
      }
    });
  }

  traerComandaPorCliente() {

    for (let i = 0; i < this.comandas.length; i++) {
      this._comanda.verificarComandaPorUsuario(this.comandas[i].id)
        .then((c) => {
          if (c) {
            this._mesa.traerMesa(c.mesa).then((m) => {
              this.mesa = m;
              this.comanda = c;
              localStorage.setItem('comandaID', this.comanda.id.toString());
              localStorage.setItem('mesaID', this.mesa.idMesa.toString());
              this.traerMozoAsociado(this.comanda.mozoId);
            });
          }
        });
      if (this.comanda) {
        break;
      }
    }
  }

  traerMozoAsociado(mozoId: any): Promise<any> {
    return new Promise((resolve) => {
      this._usuario.buscarNombreYApellido(mozoId).then((mozo) => {
        this.nombreMozo = mozo;
        localStorage.setItem('nombreMozo', mozo);
        this._usuario.buscarFoto(mozoId).then((url) => {
          this.fotoMozo = url;
          localStorage.setItem('fotoMozo', url);
          resolve(true);
        });
      });
    });
  }

  ngOnDestroy() {
    this.comandaSubscription.unsubscribe();
  }

  public hacerEncuesta() {
    this._router.navigate(['../encuesta']);
  }

}
