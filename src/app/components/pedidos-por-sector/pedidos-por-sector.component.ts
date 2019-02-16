import { UsuarioService } from './../../providers/usuarios/usuario.service';
import { BebidasService } from './../../providers/bebidas/bebidas.service';
import { PlatosService } from './../../providers/platos/platos.service';
import { ComandasService } from './../../providers/comandas/comandas.service';
import { MesaService } from './../../providers/mesa/mesa.service';
import { Component, OnInit } from '@angular/core';
import { IMesa } from 'src/app/clases/IMesa';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';
import { IComanda } from 'src/app/clases/IComanda';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedidos-por-sector',
  templateUrl: './pedidos-por-sector.component.html',
  styleUrls: ['./pedidos-por-sector.component.scss']
})
export class PedidosPorSectorComponent implements OnInit {

  isLinear = false;
  perfil: string = "";
  mesa: string;
  estado: string = "pendiente";
  listaPedidosPendientes: Array<any> = [];
  listaPedidosEnPreparacion: Array<any> = [];
  listaPedidosListos: Array<any> = [];
  comandas: IComanda[][];
  bebidas: any[];
  cocina: any[];
  cerveza: any[];
  subs: Subscription;
  automatico: Boolean = true;
  public mesas: IMesa[] = [];
  // public pedidos: IComandaPedido[] =
  //   [
  //     { "id": 1, "estado": "derivado", "tiempoMayorEstimado": 20, "codigoPedido": "CD423", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 333104 }, { "cantidad": 2, "bebidaID": 333104 }] } },
  //     { "id": 1, "estado": "preparado", "tiempoMayorEstimado": 10, "codigoPedido": "TS543", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 480844 }, { "cantidad": 2, "bebidaID": 480844 }, { "cantidad": 2, "bebidaID": 480844 }] } },
  //     { "id": 1, "estado": "pendiente", "tiempoMayorEstimado": 18, "codigoPedido": "AG543", "subPedidosBebida": { "id": 1, "estado": 'Pendiente', "items": [{ "cantidad": 2, "bebidaID": 4366576 }, { "cantidad": 2, "bebidaID": 4366576 }] } }
  //   ];

  constructor(
    public _mesas: MesaService,
    public _comandas: ComandasService,
    public _platos: PlatosService,
    public _bebidas: BebidasService,
    public _usuarios: UsuarioService
  ) {
    //this.perfil = localStorage.getItem("perfil");
    this.perfil = localStorage.getItem('perfil');

  }

  ngOnInit() {
    this.automatico = false;
    this.inicializar();
    setTimeout(() => {
      this.automatico = true;
    }, 4000);
  }

  verPedidos() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  inicializar() {
    this.buscarComanda();
  }

  buscarComanda() {
    //Recorro las comandas abiertas
    this.subs = this._comandas.comandasAbiertas
      .valueChanges()
      .subscribe(data => {
        let comanda: any;
        this.comandas = data;
        this.listaPedidosPendientes = [];
        this.listaPedidosEnPreparacion = [];
        this.listaPedidosListos = [];
        //Recorro las comandas
        for (let i = 0; i < data.length; i++) {
          comanda = data[i];
          this.armarListasEstados(comanda).then(() => {
            // if (this.listaPedidosPendientes.length == 0)
            //   if (this.listaPedidosEnPreparacion.length == 0)
            //     if (this.listaPedidosEntregados.length > 0)
            //       this.todoEntregado = true;
          });
        }
      });
  }

  armarComandaPendiente(mesaID: number, mozoID: string): Promise<any> {
    return new Promise<any>(resolve => {
      Promise.all([
        this._mesas.buscarNroMesa(mesaID),
        this._usuarios.buscarNombreYApellido(mozoID),
        this._usuarios.buscarFoto(mozoID)
      ]).then(data => {
        resolve({
          mesa: data[0],
          mozo: data[1],
          fotoMozo: data[2]
        });
      });
    });
  }


  async armarListasEstados(comanda: IComanda): Promise<any> {
    let promesa = new Promise(async (resolve, reject) => {
      let hora: string = "";
      if (comanda.pedidos != null) {
        await this.armarComandaPendiente(comanda.mesa, comanda.mozoId).then(
          async data => {
            //Recorro los pedidos
            for (let i = 0; i < comanda.pedidos.length; i++) {
              //hora = this._utils.convertirAHora(this.comanda.pedidos[i].id);
              if (comanda.pedidos[i].estado == "Derivado") {
                if (this.perfil == "bartender") {
                  //await this.armarListaBebidas(comanda.pedidos[i]).then(() => {
                  let item = {
                    comandaID: comanda.id,
                    codigoPedido: comanda.pedidos[i].codigoPedido,
                    mesa: data.mesa,
                    mozo: data.mozo,
                    fotoMozo: data.fotoMozo,
                    id: comanda.pedidos[i].id,
                    hora: hora,
                    estado: comanda.pedidos[i].estado,
                    estadoSubpedido:
                      comanda.pedidos[i].subPedidosBebida.estado,
                    tiempoEstimado: comanda.pedidos[i].tiempoMayorEstimado,
                    horaDerivado: comanda.pedidos[i].horaDerivado,
                    productos: comanda.pedidos[i].subPedidosBebida
                  };
                  //if (comanda.pedidos[i].subPedidosBebida != null) {
                  if (comanda.pedidos[i].subPedidosBebida.estado == "Pendiente") {
                    this.listaPedidosPendientes.push(item);
                  } else if (comanda.pedidos[i].subPedidosBebida.estado == "En Preparacion") {
                    this.listaPedidosEnPreparacion.push(item);
                  }
                  else if (comanda.pedidos[i].subPedidosBebida.estado == "Preparado") {
                    this.listaPedidosListos.push(item);
                  }
                  //}
                  //});
                }



                else if (this.perfil == "cocinero") {
                  //await this.armarListaComidas(comanda.pedidos[i]).then(() => {
                  let item = {
                    comandaID: comanda.id,
                    codigoPedido: comanda.pedidos[i].codigoPedido,
                    mesa: data.mesa,
                    mozo: data.mozo,
                    fotoMozo: data.fotoMozo,
                    id: comanda.pedidos[i].id,
                    hora: hora,
                    estado: comanda.pedidos[i].estado,
                    estadoSubpedido:
                      comanda.pedidos[i].subPedidosCocina.estado,
                    tiempoEstimado:
                      comanda.pedidos[i].tiempoMayorEstimado,
                    horaDerivado: comanda.pedidos[i].horaDerivado,
                    productos: comanda.pedidos[i].subPedidosCocina
                  };
                  // if (this.cocina != null) {
                  if (comanda.pedidos[i].subPedidosCocina.estado == "Pendiente") {
                    this.listaPedidosPendientes.push(item);
                  } else if (comanda.pedidos[i].subPedidosCocina.estado == "En Preparacion") {
                    this.listaPedidosEnPreparacion.push(item);
                  }
                  else if (comanda.pedidos[i].subPedidosCocina.estado == "Preparado") {
                    this.listaPedidosListos.push(item);
                  }
                }
                //});


                else if (this.perfil == "cervecero") {
                  //await this.armarListaComidas(comanda.pedidos[i]).then(() => {
                  let item = {
                    comandaID: comanda.id,
                    codigoPedido: comanda.pedidos[i].codigoPedido,
                    mesa: data.mesa,
                    mozo: data.mozo,
                    fotoMozo: data.fotoMozo,
                    id: comanda.pedidos[i].id,
                    hora: hora,
                    estado: comanda.pedidos[i].estado,
                    estadoSubpedido: comanda.pedidos[i].subPedidosCerveza.estado,
                    tiempoEstimado: comanda.pedidos[i].tiempoMayorEstimado,
                    horaDerivado: comanda.pedidos[i].horaDerivado,
                    productos: comanda.pedidos[i].subPedidosCerveza
                  };
                  //if (this.cerveza != null) {
                  if (comanda.pedidos[i].subPedidosCerveza.estado == "Pendiente") {
                    this.listaPedidosPendientes.push(item);
                  } else if (comanda.pedidos[i].subPedidosCerveza.estado == "En Preparacion") {
                    this.listaPedidosEnPreparacion.push(item);
                  }
                  else if (comanda.pedidos[i].subPedidosCerveza.estado == "Preparado") {
                    this.listaPedidosListos.push(item);
                  }
                  // }
                  //});
                }
              }
            }
          }
        );
      }
      resolve();
    });
    return promesa;
  }


  async armarListaBebidas(pedido: IComandaPedido): Promise<any> {
    let promesa = new Promise(async (resolve, reject) => {
      if (pedido.subPedidosBebida.items != null) {
        await this.buscarBebidas(pedido.subPedidosBebida.items)
          .then(lista => {
            this.bebidas = lista;
            resolve();
          })
          .catch(() => reject());
      } else {
        this.bebidas = null;
        resolve();
      }
    });
    return promesa;
  }

  async armarListaComidas(pedido: IComandaPedido): Promise<any> {
    let promesa = new Promise(async (resolve, reject) => {
      if (pedido.subPedidosCocina.items != null) {
        this.buscarPlatos(pedido.subPedidosCocina.items)
          .then(lista => {
            this.cocina = lista;
            resolve();
          })
          .catch(() => reject());
      } else {
        this.cocina = null;
        resolve();
      }
    });
    return promesa;
  }



  public cambiarEstadoPedido(event: any) {
    this.automatico = false;
    let itemComanda: any;
    let encontro: boolean = false;
    // this._utils.presentLoading("Cambiando estado...");
    for (let i = 0; i < this.comandas.length; i++) {
      itemComanda = this.comandas[i];
      if (itemComanda.id == event.idComanda) {
        for (let j = 0; j < itemComanda.pedidos.length; j++) {
          if (itemComanda.pedidos[j].id == event.idPedido) {
            encontro = true;
            if (this.perfil == "bartender") {
              itemComanda.pedidos[j].subPedidosBebida.estado = event.estadoPedido;
            }
            if (this.perfil == "cocinero") {
              console.log("ESTADO A CAMBIAR: " + event.estadoPedido);
              itemComanda.pedidos[j].subPedidosCocina.estado = event.estadoPedido;
            }
            if (this.perfil == "cervecero") {
              itemComanda.pedidos[j].subPedidosCerveza.estado = event.estadoPedido;
            }
            break;
          }
        }
      }
      if (encontro)
        break;
    }
    this._comandas.actualizarComanda(itemComanda).then(
      () => {
        console.log("Cambió el estado del pedido");
        //this.inicializar();
        setTimeout(() => {
          this.automatico = true;
        }, 2000);
      },
      () => {
        console.log("Reintente");
      }
    );
  }

  async buscarBebidas(subPedidoBebidas: any) {
    let lbebidas = [];
    let promesa = new Promise<any[]>(async (resolve, reject) => {
      await subPedidoBebidas.forEach(itemBebida => {
        this._bebidas
          .traerBebida(itemBebida.bebidaID)
          .then((b: any) => {
            lbebidas.push({
              cantidad: itemBebida.cantidad,
              bebida: b,
              precio: Number(b.importe) * Number(itemBebida.cantidad)
            });
            resolve(lbebidas);
          })
          .catch(() => {
            reject();
          });
      });
    });
    return promesa;
  }

  async buscarPlatos(subpedidoCocina: any) {
    let lPlatos = [];
    let promesa = new Promise<any[]>(async (resolve, reject) => {
      await subpedidoCocina.forEach(itemPlato => {
        this._platos
          .traerPlato(itemPlato.platoID)
          .then((p: any) => {
            lPlatos.push({
              cantidad: itemPlato.cantidad,
              plato: p,
              precio: Number(p.importe) * Number(itemPlato.cantidad)
            });
            resolve(lPlatos);
          })
          .catch(() => {
            reject();
          });
      });
    });
    return promesa;
  }

  public cambiarTiempoEstimado(event: any) {
    console.log("CAMBIAR TIEMPO ESTIMADO: ");
    console.log(event);
    this.automatico = false;
    let itemComanda: any;
    let encontro: boolean = false;
    for (let i = 0; i < this.comandas.length; i++) {
      itemComanda = this.comandas[i];
      if (itemComanda.id == event.idComanda) {
        for (let j = 0; j < itemComanda.pedidos.length; j++) {
          if (itemComanda.pedidos[j].id == event.idPedido) {
            encontro = true;
            itemComanda.pedidos[j].tiempoMayorEstimado = event.tiempo;
            break;
          }
        }
      }
      if (encontro)
        break;
    }
    this._comandas.actualizarComanda(itemComanda).then(
      () => {
        console.log("Cambió el tiempo del pedido");
        setTimeout(() => {
          this.automatico = true;
        }, 2000);
      },
      () => {
        console.log("Reintente");
      });
  }

}

