import { Component, OnInit, Input } from '@angular/core';
import { IComanda } from 'src/app/clases/IComanda';
import { IMesa } from 'src/app/clases/IMesa';
import { ComandasService } from '../../../providers/comandas/comandas.service';
import { MatSnackBar } from '@angular/material';
import { MesaService } from '../../../providers/mesa/mesa.service';

@Component({
  selector: 'app-ver-comanda',
  templateUrl: './ver-comanda.component.html',
  styleUrls: ['./ver-comanda.component.scss']
})
export class VerComandaComponent implements OnInit {

  @Input() public comanda: IComanda;
  @Input() public mesa: IMesa;
  public nombreBoton: string;
  public mostrarCaptcha: boolean = false;

  constructor(
    private _comanda: ComandasService,
    private snackBar: MatSnackBar,
    private _mesa: MesaService) { }

  ngOnInit() {
    this.definirNombreBoton();
  }

  permitirCerrarMesa(rta: boolean) {
    if (rta) {
      this.mostrarCaptcha = false;
      this.cerrarCobrarComanda();
    }
  }

  confirmarCerrarConCaptcha() {
    this.mostrarCaptcha = true;
  }

  cerrarCobrarComanda() {
    if (this.nombreBoton == "Cobrar") {
      this.mesa.estado = "Cobrando";

      this._mesa.actualizarMesa(this.mesa).then(() => {
        this.openSnackBar("La comanda está cobrando", " ");
      });
    } else {

      this.comanda.estado = "Cerrada";
      this._comanda.cerrarComanda(this.comanda, this.mesa).then(() => {
        this.comanda = null;
        this.mesa = null;
        this.openSnackBar("La comanda fue cerrada", " ");
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  habilitarBoton(): boolean {
    let deshabilitar: boolean = false;

    this.comanda.pedidos.forEach(pedido => {
      if (pedido.estado != "Entregado") {
        deshabilitar = true;
      }
    });

    return deshabilitar;
  }


  definirNombreBoton() {
    const perfil = localStorage.getItem('perfil');

    if (perfil == "mozo") {
      this.nombreBoton = "Cobrar";
    } else if (perfil == "admin") {
      this.nombreBoton = "Cerrar";
    }
  }

  verBotones(): boolean {
    const perfil = localStorage.getItem('perfil');

    if (perfil == "Cliente") {
      return false;
    } else if (perfil == "admin") {
      return true;
    } else {
      if (this.mesa.estado != "Cobrando") {
        return true;
      } else {
        return false;
      }
    }
  }
}
