import { ISubpedidoCerveza } from './../../clases/ISubpedidoCerveza';
import { merge } from 'rxjs';
import { ComandasService } from './../../providers/comandas/comandas.service';
import { BebidasService } from './../../providers/bebidas/bebidas.service';
import { PlatosService } from './../../providers/platos/platos.service';
import { Component, OnInit } from '@angular/core';
import { ISubpedidoItem } from 'src/app/clases/ISubpedidoItem';
import { IProducto } from 'src/app/clases/IProducto';
import { IComanda } from 'src/app/clases/IComanda';
import { IComandaPedido } from 'src/app/clases/IComandaPedido';
import { ISubpedidoComida } from 'src/app/clases/ISubpedidoComida';
import { ISubpedidoBebida } from 'src/app/clases/ISubpedidoBebida';


@Component({
  selector: 'app-menu-carta',
  templateUrl: './menu-carta.component.html',
  styleUrls: ['./menu-carta.component.scss']
})
export class MenuCartaComponent implements OnInit {

  public lCalientes: ISubpedidoItem[] = [];
  public lFrios: ISubpedidoItem[] = [];
  public lMinutas: ISubpedidoItem[] = [];
  public lPostres: ISubpedidoItem[] = [];
  public lBebidas: ISubpedidoItem[] = [];
  public lTragos: ISubpedidoItem[] = [];
  public lCervezas: ISubpedidoItem[] = [];

  public comanda: IComanda;
  public menu = [];
  public mesa: any;
  public tipomenu: any;
  public pedidoACargar: ISubpedidoItem[] = [];
  public cant: number;
  public platos: any;
  //CAMPOS COMANDA
  public itemsCocina: { cantidad: number; platoID: number }[] = [];
  public itemsBebida: { cantidad: number; bebidaID: number }[] = [];
  public itemsCerveza: { cantidad: number; bebidaID: number }[] = [];
  public tiemposEstimadosDelPedido = [];

  public subTotal: number = 0;

  public pedidoCocina: any[];
  public pedidoBartender: any[];
  public pedidoCerveza: any[];

  constructor(
    public _platos: PlatosService,
    public _bebidas: BebidasService,
    public _comandas: ComandasService) {

    //this._platos.traerPlatos('postres');
    this.traerEntradas();
    this.traerPrincipal();
    this.traerPostres();
    this.traerBebidas();
    this.traerTragos();

    //this.mesa = this.navParams.get("mesa");
    //this.comanda = this.navParams.get("comanda");
    this.tipomenu = "minutas";
  }

  ngOnInit() {
  }

  public cargarPedido() {
    this.pedidoCocina = (this.lMinutas.filter(p => p.cantidad > 0)).concat(this.lFrios.filter(p => p.cantidad)).concat(this.lCalientes.filter(p => p.cantidad)).concat(this.lPostres.filter(p => p.cantidad));
    this.pedidoCerveza = this.lCervezas.filter(p => p.cantidad > 0);
    this.pedidoBartender = this.lBebidas.filter(p => p.cantidad > 0).concat(this.lTragos.filter(p => p.cantidad));
  }

  cargarLista(item: IProducto, cantidad: number): ISubpedidoItem {
    let pedido: ISubpedidoItem = {
      nombre: item.nombre,
      id: item.id,
      tiempoEstimado: item.tiempoEstimado,
      importe: item.importe,
      categoria: item.categoria,
      descripcion: item.descripcion,
      idSubpedidoItem: 0,
      cantidad: cantidad
      // ingredientesFoto: item.ingredientesFoto,
      // preparacionFoto: item.preparacionFoto,
      // preparadoFoto: item.preparadoFoto,
    };
    return pedido;
  }

  sumarCantidad(item: ISubpedidoItem, value: number) {
    item.cantidad = item.cantidad + value;
    //  this.subTotal = parseInt(this.subTotal.toString()) + parseInt(item.importe.toString());
  }

  restarCantidad(item: ISubpedidoItem, value: number) {
    if (item.cantidad > 0) {
      item.cantidad = item.cantidad + value;
      //   this.subTotal = parseInt(this.subTotal.toString()) - parseInt(item.importe.toString());
    }
  }

  existeMenu(categoria: string): boolean {
    let c = categoria.toLowerCase();
    switch (c) {
      case "minutas":
        if (this.lMinutas.length > 0) {
          return true;
        }
        break;
      case "frios":
        if (this.lFrios.length > 0) {
          return true;
        }
        break;
      case "calientes":
        if (this.lCalientes.length > 0) {
          return true;
        }
        break;
      case "postres":
        if (this.lPostres.length > 0) {
          return true;
        }
        break;
      case "bebidas":
        if (this.lBebidas.length > 0) {
          return true;
        }
        break;
      case "tragos":
        if (this.lBebidas.length > 0) {
          return true;
        }
        break;
      case "cervezas":
        if (this.lBebidas.length > 0) {
          return true;
        }
        break;
    }
    return false;
  }

  traerEntradas() {
    merge(this._platos.traerPlatos('Frios'), this._platos.traerPlatos('Minutas'))
      .subscribe(data => {
        data.forEach((item: IProducto) => {
          if (!this.lMinutas.some(p => p.id === item.id)) {
            this.lMinutas.push(this.cargarLista(item, 0));
          }
        });
      })
  }

  traerPrincipal() {
    this._platos.traerPlatos('Calientes').subscribe(dataPlatos => {
      dataPlatos.forEach((item: IProducto) => {
        if (!this.lCalientes.some(p => p.id === item.id)) {
          this.lCalientes.push(this.cargarLista(item, 0));
        }
      });
    })
  }

  traerPostres() {
    this._platos.traerPlatos('Postres').subscribe(dataPlatos => {
      dataPlatos.forEach((item: IProducto) => {
        if (!this.lPostres.some(p => p.id === item.id)) {
          this.lPostres.push(this.cargarLista(item, 0));
        }
      });
    })
  }

  traerBebidas() {
    this._bebidas.traerBebidas('bebida')
      .subscribe(data => {
        data.forEach((item: IProducto) => {
          if (!this.lBebidas.some(p => p.id === item.id)) {
            this.lBebidas.push(this.cargarLista(item, 0));
          }
        });
      })
  }

  traerTragos() {
    this._bebidas.traerBebidas('trago')
      .subscribe(data => {
        data.forEach((item: IProducto) => {
          if (!this.lTragos.some(p => p.id === item.id)) {
            this.lTragos.push(this.cargarLista(item, 0));
          }
        });
      })
  }

  traerCervezas() {
    this._bebidas.traerBebidas('cerveza')
      .subscribe(data => {
        data.forEach((item: IProducto) => {
          if (!this.lCervezas.some(p => p.id === item.id)) {
            this.lCervezas.push(this.cargarLista(item, 0));
          }
        });
      })
  }

  // traerEntradas() {

  //   this._platos.traerPlatos('Minutas').subscribe(dataPlatos => {
  //     if (this.lMinutas.length > 0) {
  //       let listaAux: ISubpedidoItem[] = this.lMinutas;
  //       let itemAux: ISubpedidoItem = null;
  //       this.lMinutas = [];
  //       dataPlatos.forEach((item: IProducto) => {
  //         itemAux = listaAux.find(i => i.id == item.id);
  //         if (itemAux != null)
  //           //ya estaba en la lista
  //           this.lMinutas.push(this.cargarLista(item, itemAux.cantidad));
  //         else this.lMinutas.push(this.cargarLista(item, 0));
  //         if (!this.lMinutas.some(p => p.id === item.id)) { this.lMinutas.push(this.cargarLista(item, 0)); }
  //       });
  //     } else {
  //       dataPlatos.forEach((item: IProducto) => {
  //         if (!this.lMinutas.some(p => p.id === item.id)) {
  //           this.lMinutas.push(this.cargarLista(item, 0));
  //         }
  //       });
  //     }
  //   })
  //   this._platos.traerPlatos('Frios').subscribe(dataPlatos => {

  //     if (this.lMinutas.length > 0) {
  //       let listaAux: ISubpedidoItem[] = this.lMinutas;
  //       let itemAux: ISubpedidoItem = null;
  //       this.lMinutas = [];
  //       dataPlatos.forEach((item: IProducto) => {
  //         itemAux = listaAux.find(i => i.id == item.id);
  //         if (itemAux != null)
  //           //ya estaba en la lista
  //           this.lMinutas.push(this.cargarLista(item, itemAux.cantidad));
  //         else this.lMinutas.push(this.cargarLista(item, 0));
  //         if (!this.lMinutas.some(p => p.id === item.id)) { this.lMinutas.push(this.cargarLista(item, 0)); }
  //       });
  //     } else {
  //       dataPlatos.forEach((item: IProducto) => {
  //         if (!this.lMinutas.some(p => p.id === item.id)) {
  //           this.lMinutas.push(this.cargarLista(item, 0));
  //         }
  //       });
  //     }
  //   })
  // }


  // traerPrincipal() {
  //   this._platos.traerPlatos('Calientes').subscribe(dataPlatos => {
  //     if (this.lCalientes.length > 0) {
  //       let listaAux: ISubpedidoItem[] = this.lCalientes;
  //       let itemAux: ISubpedidoItem = null;

  //       this.lCalientes = [];
  //       dataPlatos.forEach((item: IProducto) => {
  //         itemAux = listaAux.find(i => i.id == item.id);

  //         if (itemAux != null)
  //           this.lCalientes.push(
  //             this.cargarLista(item, itemAux.cantidad)
  //           );
  //         else this.lCalientes.push(this.cargarLista(item, 0));

  //         if (!this.lCalientes.some(p => p.id === item.id)) {
  //           this.lCalientes.push(this.cargarLista(item, 0));
  //         }
  //       });
  //     } else {
  //       dataPlatos.forEach((item: IProducto) => {
  //         if (!this.lCalientes.some(p => p.id === item.id)) {
  //           this.lCalientes.push(this.cargarLista(item, 0));
  //         }
  //       });
  //     }
  //   })
  // }


  getItems(ev: any) {
    //this.inicializarItemsMenu();
    const val = ev.target.value;

    if (val && val.trim() != "") {
      this.lCalientes = this.lCalientes.filter(item => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  agregarPedido() {
    let estadoCocina: string = "";
    let estadoBebida: string = "";
    let estadoCerveza: string = "";
    let comandaPedido: IComandaPedido;
    let comandaPedidos: IComandaPedido[];
    this.cargarItemsSubpedidos(this.lMinutas);
    this.cargarItemsSubpedidos(this.lFrios);
    this.cargarItemsSubpedidos(this.lCalientes);
    this.cargarItemsSubpedidos(this.lPostres);
    this.cargarItemsSubpedidos(this.lBebidas);
    this.cargarItemsSubpedidos(this.lCervezas);
    //Aca tengo cargados los items categorizados
    //Si hay items cargados le doy el estado Pendiente, sino Nada (porque en los pedidos de la comanda van a haber 2 subitems)
    if (this.itemsCocina.length > 0) estadoCocina = "Pendiente";
    else estadoCocina = "Nada";
    if (this.itemsBebida.length > 0) estadoBebida = "Pendiente";
    else estadoBebida = "Nada";
    if (this.itemsCerveza.length > 0) estadoCerveza = "Pendiente";
    else estadoCerveza = "Nada";
    let subCocina: ISubpedidoComida = {
      id: new Date().valueOf(),
      estado: estadoCocina,
      items: this.itemsCocina
    };
    let subBebida: ISubpedidoBebida = {
      id: new Date().valueOf(),
      estado: estadoBebida,
      items: this.itemsBebida
    };
    let subCerveza: ISubpedidoCerveza = {
      id: new Date().valueOf(),
      estado: estadoCerveza,
      items: this.itemsCerveza
    };
    let tiempoMayorEstimado = Math.max(...this.tiemposEstimadosDelPedido);
    comandaPedido = {
      id: new Date().valueOf(),
      estado: "Pendiente",
      subPedidosBebida: subBebida,
      subPedidosComida: subCocina,
      subPedidosCerveza: subCerveza,
      tiempoMayorEstimado: tiempoMayorEstimado
    };
    if (this.comanda.pedidos != null) {
      this.comanda.pedidos.push(comandaPedido);
    } else {
      comandaPedidos = [comandaPedido];
      this.comanda.pedidos = comandaPedidos;
    }
    this._comandas.actualizarComanda(this.comanda).then(
      () => { },
      () => {//  this.UtilProvider.mostrarMensaje("Reintente por favor");
      });
  }

  cargarSubpedidos() { }

  cargarItemsSubpedidos(itemsSeleccionados: ISubpedidoItem[]) {
    itemsSeleccionados
      .filter(item => item.cantidad > 0)
      .forEach((i: ISubpedidoItem) => {
        if (i.categoria == "bebida" || i.categoria == 'trago') {
          this.itemsBebida.push({ cantidad: i.cantidad, bebidaID: i.id });
          this.tiemposEstimadosDelPedido.push(i.tiempoEstimado);
        }
        else if (i.categoria == 'cerveza') {
          this.itemsCerveza.push({ cantidad: i.cantidad, bebidaID: i.id });
          this.tiemposEstimadosDelPedido.push(i.tiempoEstimado);
        }
        else {
          this.itemsCocina.push({ cantidad: i.cantidad, platoID: i.id });
          this.tiemposEstimadosDelPedido.push(i.tiempoEstimado);
        }
        // this.pedidoACargar.push(i);
      });
  }
}
