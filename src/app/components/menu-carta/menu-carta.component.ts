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
  public tiemposEstimadosDelPedido = [];

  public subTotal: number = 0;


  constructor(
    public _platos: PlatosService,
    public _bebidas: BebidasService,
    public _comandas: ComandasService) {

    //this._platos.traerPlatos('postres');
    this.traerEntradas();
    this.traerPrincipal();
    this.traerPostres();
    this.traerBebidas();

    //this.mesa = this.navParams.get("mesa");
    //this.comanda = this.navParams.get("comanda");
    this.tipomenu = "minutas";
  }


  public pedidoCocina: any[];
  public pedidoBartender: any[];
  public pedidoCerveza: any[];

  public cargarPedido() {
    this.pedidoCocina = (this.lMinutas.filter(p => p.cantidad > 0)).concat(this.lFrios.filter(p => p.cantidad)).concat(this.lCalientes.filter(p => p.cantidad)).concat(this.lPostres.filter(p => p.cantidad));
    this.pedidoCerveza = this.lCervezas.filter(p => p.cantidad > 0);
    this.pedidoBartender = this.lBebidas.filter(p => p.cantidad > 0).concat(this.lTragos.filter(p => p.cantidad));

    console.log(this.pedidoCocina);
    console.log(this.pedidoBartender);
    console.log(this.pedidoCerveza);
  }


  ngOnInit() {
    this.traerEntradas();
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
    console.log(item.cantidad);
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
    console.log("ENTRADAS");
    this._platos.traerPlatos('Minutas').subscribe(dataPlatos => {
      console.log("ENTRADAS");
      if (this.lMinutas.length > 0) {
        let listaAux: ISubpedidoItem[] = this.lMinutas;
        let itemAux: ISubpedidoItem = null;
        this.lMinutas = [];
        dataPlatos.forEach((item: IProducto) => {
          itemAux = listaAux.find(i => i.id == item.id);
          if (itemAux != null)
            //ya estaba en la lista
            this.lMinutas.push(this.cargarLista(item, itemAux.cantidad));
          else this.lMinutas.push(this.cargarLista(item, 0));
          if (!this.lMinutas.some(p => p.id === item.id)) { this.lMinutas.push(this.cargarLista(item, 0)); }
        });
      } else {
        dataPlatos.forEach((item: IProducto) => {
          if (!this.lMinutas.some(p => p.id === item.id)) {
            this.lMinutas.push(this.cargarLista(item, 0));
          }
        });
      }
    })
  }

  traerPrincipal() {
    this._platos.traerPlatos('Calientes').subscribe(dataPlatos => {
      console.log("CALIENTE");

      if (this.lCalientes.length > 0) {
        let listaAux: ISubpedidoItem[] = this.lCalientes;
        let itemAux: ISubpedidoItem = null;

        this.lCalientes = [];
        dataPlatos.forEach((item: IProducto) => {
          itemAux = listaAux.find(i => i.id == item.id);

          if (itemAux != null)
            this.lCalientes.push(
              this.cargarLista(item, itemAux.cantidad)
            );
          else this.lCalientes.push(this.cargarLista(item, 0));

          if (!this.lCalientes.some(p => p.id === item.id)) {
            this.lCalientes.push(this.cargarLista(item, 0));
          }
        });
      } else {
        dataPlatos.forEach((item: IProducto) => {
          if (!this.lCalientes.some(p => p.id === item.id)) {
            this.lCalientes.push(this.cargarLista(item, 0));
          }
        });
      }
    })
  }

  traerPostres() {
    this._platos.traerPlatos('Postres').subscribe(dataPlatos => {
      console.log("POSTRES");
      if (this.lPostres.length > 0) {
        let listaAux: ISubpedidoItem[] = this.lPostres;
        let itemAux: ISubpedidoItem = null;
        this.lPostres = [];
        dataPlatos.forEach((item: IProducto) => {
          itemAux = listaAux.find(i => i.id == item.id);
          if (itemAux != null)
            this.lPostres.push(this.cargarLista(item, itemAux.cantidad));
          else this.lPostres.push(this.cargarLista(item, 0));

          if (!this.lPostres.some(p => p.id === item.id)) {
            this.lPostres.push(this.cargarLista(item, 0));
          }
        });
      } else {
        dataPlatos.forEach((item: IProducto) => {
          if (!this.lPostres.some(p => p.id === item.id)) {
            this.lPostres.push(this.cargarLista(item, 0));
          }
        });
      }
    })
  }

  traerBebidas() {
    this._bebidas.traerBebidas('bebida').subscribe(dataBebidas => {
      console.log("BEBIDAS");
      console.log(this.lBebidas.length);
      if (this.lBebidas.length > 0) {
        let listaAux: ISubpedidoItem[] = this.lBebidas;
        let itemAux: ISubpedidoItem = null;
        this.lBebidas = [];
        dataBebidas.forEach((item: IProducto) => {
          itemAux = listaAux.find(i => i.id == item.id);
          if (itemAux != null)
            this.lBebidas.push(this.cargarLista(item, itemAux.cantidad));
          else this.lBebidas.push(this.cargarLista(item, 0));

          if (!this.lBebidas.some(p => p.id === item.id)) {
            this.lBebidas.push(this.cargarLista(item, 0));
          }
        });
      } else {
        dataBebidas.forEach((item: IProducto) => {
          if (!this.lBebidas.some(p => p.id === item.id)) {

            console.log("ITEM BEBIDA");
            console.log(item);
            this.lBebidas.push(this.cargarLista(item, 0));
          }
        });
      }
    })
    this._bebidas.traerBebidas('trago').subscribe(dataTragos => {
      console.log("TRAGOS");
      if (this.lTragos.length > 0) {
        let listaAux: ISubpedidoItem[] = this.lTragos;
        let itemAux: ISubpedidoItem = null;
        this.lTragos = [];
        dataTragos.forEach((item: IProducto) => {
          itemAux = listaAux.find(i => i.id == item.id);
          if (itemAux != null)
            this.lTragos.push(this.cargarLista(item, itemAux.cantidad));
          else this.lTragos.push(this.cargarLista(item, 0));

          if (!this.lTragos.some(p => p.id === item.id)) {
            console.log("ITEM TRAGO");
            console.log(item);
            this.lTragos.push(this.cargarLista(item, 0));
          }
        });
      } else {
        dataTragos.forEach((item: IProducto) => {
          if (!this.lTragos.some(p => p.id === item.id)) {
            this.lTragos.push(this.cargarLista(item, 0));
          }
        });
      }
    })
  }


  traerMenuPorCategoria(categoria: string) {
    let c = categoria.toLowerCase();
    if (!this.existeMenu(categoria)) {
      this._platos.traerPlatos(categoria).subscribe(dataPlatos => {
        console.log("CATEGORIA");
        console.log(categoria);
        console.log(dataPlatos);
        switch (c) {
          case "minutas":
            if (this.lMinutas.length > 0) {
              let listaAux: ISubpedidoItem[] = this.lMinutas;
              let itemAux: ISubpedidoItem = null;

              this.lMinutas = [];
              dataPlatos.forEach((item: IProducto) => {
                itemAux = listaAux.find(i => i.id == item.id);

                if (itemAux != null)
                  //ya estaba en la lista
                  this.lMinutas.push(this.cargarLista(item, itemAux.cantidad));
                else this.lMinutas.push(this.cargarLista(item, 0));

                if (!this.lMinutas.some(p => p.id === item.id)) {
                  this.lMinutas.push(this.cargarLista(item, 0));
                }
              });
            } else {
              dataPlatos.forEach((item: IProducto) => {
                if (!this.lMinutas.some(p => p.id === item.id)) {
                  this.lMinutas.push(this.cargarLista(item, 0));
                  console.log("ITEM: ");
                  console.log(item);
                }
              });
            }

            break;
          case "calientes":
            if (this.lCalientes.length > 0) {
              let listaAux: ISubpedidoItem[] = this.lCalientes;
              let itemAux: ISubpedidoItem = null;

              this.lCalientes = [];
              dataPlatos.forEach((item: IProducto) => {
                itemAux = listaAux.find(i => i.id == item.id);

                if (itemAux != null)
                  this.lCalientes.push(
                    this.cargarLista(item, itemAux.cantidad)
                  );
                else this.lCalientes.push(this.cargarLista(item, 0));

                if (!this.lCalientes.some(p => p.id === item.id)) {
                  this.lCalientes.push(this.cargarLista(item, 0));
                }
              });
            } else {
              dataPlatos.forEach((item: IProducto) => {
                if (!this.lCalientes.some(p => p.id === item.id)) {
                  this.lCalientes.push(this.cargarLista(item, 0));
                }
              });
            }

            break;
          case "frios":
            if (this.lFrios.length > 0) {
              let listaAux: ISubpedidoItem[] = this.lFrios;
              let itemAux: ISubpedidoItem = null;

              this.lFrios = [];
              dataPlatos.forEach((item: IProducto) => {
                itemAux = listaAux.find(i => i.id == item.id);

                if (itemAux != null)
                  this.lFrios.push(this.cargarLista(item, itemAux.cantidad));
                else this.lFrios.push(this.cargarLista(item, 0));

                if (!this.lFrios.some(p => p.id === item.id)) {
                  this.lFrios.push(this.cargarLista(item, 0));
                }
              });
            } else {
              dataPlatos.forEach((item: IProducto) => {
                if (!this.lFrios.some(p => p.id === item.id)) {
                  this.lFrios.push(this.cargarLista(item, 0));
                }
              });
            }

            break;
          case "postres":
            if (this.lPostres.length > 0) {
              let listaAux: ISubpedidoItem[] = this.lPostres;
              let itemAux: ISubpedidoItem = null;
              this.lPostres = [];
              dataPlatos.forEach((item: IProducto) => {
                itemAux = listaAux.find(i => i.id == item.id);
                if (itemAux != null)
                  this.lPostres.push(this.cargarLista(item, itemAux.cantidad));
                else this.lPostres.push(this.cargarLista(item, 0));

                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            } else {
              dataPlatos.forEach((item: IProducto) => {
                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            }
            break;
          case "bebidas":
            if (this.lPostres.length > 0) {
              let listaAux: ISubpedidoItem[] = this.lPostres;
              let itemAux: ISubpedidoItem = null;
              this.lPostres = [];
              dataPlatos.forEach((item: IProducto) => {
                itemAux = listaAux.find(i => i.id == item.id);
                if (itemAux != null)
                  this.lPostres.push(this.cargarLista(item, itemAux.cantidad));
                else this.lPostres.push(this.cargarLista(item, 0));

                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            } else {
              dataPlatos.forEach((item: IProducto) => {
                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            }
            break;
          case "tragos":
            if (this.lPostres.length > 0) {
              let listaAux: ISubpedidoItem[] = this.lPostres;
              let itemAux: ISubpedidoItem = null;
              this.lPostres = [];
              dataPlatos.forEach((item: IProducto) => {
                itemAux = listaAux.find(i => i.id == item.id);
                if (itemAux != null)
                  this.lPostres.push(this.cargarLista(item, itemAux.cantidad));
                else this.lPostres.push(this.cargarLista(item, 0));

                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            } else {
              dataPlatos.forEach((item: IProducto) => {
                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            }
            break;
          case "cervezas":
            if (this.lPostres.length > 0) {
              let listaAux: ISubpedidoItem[] = this.lPostres;
              let itemAux: ISubpedidoItem = null;
              this.lPostres = [];
              dataPlatos.forEach((item: IProducto) => {
                itemAux = listaAux.find(i => i.id == item.id);
                if (itemAux != null)
                  this.lPostres.push(this.cargarLista(item, itemAux.cantidad));
                else this.lPostres.push(this.cargarLista(item, 0));

                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            } else {
              dataPlatos.forEach((item: IProducto) => {
                if (!this.lPostres.some(p => p.id === item.id)) {
                  this.lPostres.push(this.cargarLista(item, 0));
                }
              });
            }
            break;
        }
      });
    }
  }

  // traerMenuBebidas() {
  //   if (!this.existeMenu("Bebidas")) {
  //     this._bebidas.traerBebidas().subscribe(dataBebidas => {
  //       if (this.lBebidas.length > 0) {
  //         let listaAux: ISubpedidoItem[] = this.lBebidas;
  //         let itemAux: ISubpedidoItem = null;

  //         this.lBebidas = [];
  //         dataBebidas.forEach((item: IProducto) => {
  //           itemAux = listaAux.find(i => i.id == item.id);

  //           if (itemAux != null)
  //             this.lBebidas.push(this.cargarLista(item, itemAux.cantidad));
  //           else this.lBebidas.push(this.cargarLista(item, 0));

  //           if (!this.lBebidas.some(p => p.id === item.id)) {
  //             this.lBebidas.push(this.cargarLista(item, 0));
  //           }
  //         });
  //       } else {
  //         dataBebidas.forEach((item: IProducto) => {
  //           if (!this.lBebidas.some(p => p.id === item.id)) {
  //             this.lBebidas.push(this.cargarLista(item, 0));
  //           }
  //         });
  //       }
  //     });
  //   }
  // }
  getItems(ev: any) {
    //this.inicializarItemsMenu();
    const val = ev.target.value;

    console.log(this.tipomenu);
    if (val && val.trim() != "") {
      this.lCalientes = this.lCalientes.filter(item => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  agregarPedido() {
    let estadoCocina: string = "";
    let estadoBebida: string = "";
    let comandaPedido: IComandaPedido;
    let comandaPedidos: IComandaPedido[];

    this.cargarItemsSubpedidos(this.lMinutas);
    this.cargarItemsSubpedidos(this.lFrios);
    this.cargarItemsSubpedidos(this.lCalientes);
    this.cargarItemsSubpedidos(this.lPostres);
    this.cargarItemsSubpedidos(this.lBebidas);

    //Aca tengo cargados los items categorizados
    //Si hay items cargados le doy el estado Pendiente, sino Nada (porque en los pedidos de la comanda van a haber 2 subitems)
    if (this.itemsCocina.length > 0) estadoCocina = "Pendiente";
    else estadoCocina = "Nada";

    if (this.itemsBebida.length > 0) estadoBebida = "Pendiente";
    else estadoBebida = "Nada";

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

    let tiempoMayorEstimado = Math.max(...this.tiemposEstimadosDelPedido);

    comandaPedido = {
      id: new Date().valueOf(),
      estado: "Pendiente",
      subPedidosBebida: subBebida,
      subPedidosComida: subCocina,
      tiempoMayorEstimado: tiempoMayorEstimado
    };

    if (this.comanda.pedidos != null) {
      this.comanda.pedidos.push(comandaPedido);
    } else {
      comandaPedidos = [comandaPedido];
      this.comanda.pedidos = comandaPedidos;
    }

    this._comandas.actualizarComanda(this.comanda).then(
      () => {

      },
      () => {
        //  this.UtilProvider.mostrarMensaje("Reintente por favor");
      }
    );
  }

  cargarSubpedidos() { }

  cargarItemsSubpedidos(itemsSeleccionados: ISubpedidoItem[]) {
    itemsSeleccionados
      .filter(item => item.cantidad > 0)
      .forEach((i: ISubpedidoItem) => {
        //Cargo los items discriminados por categoria Bebidas o Platos
        if (i.categoria == "Bebidas") {
          this.itemsBebida.push({ cantidad: i.cantidad, bebidaID: i.id });
          this.tiemposEstimadosDelPedido.push(i.tiempoEstimado);
        } else {
          this.itemsCocina.push({ cantidad: i.cantidad, platoID: i.id });
          this.tiemposEstimadosDelPedido.push(i.tiempoEstimado);
        }

        // this.pedidoACargar.push(i);
      });
  }

}
