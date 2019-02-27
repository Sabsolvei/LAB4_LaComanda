import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { IComanda } from '../clases/IComanda';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor(public afDB: AngularFireDatabase) { }


  traerProductosMasVendidos(): Promise<IListaProductos[]> {
    return new Promise<IListaProductos[]>((resolve, reject) => {

      const productos: IListaProductos[] = [];

      this.afDB.list('/mesa_comandas/').valueChanges().subscribe((data: IComanda[]) => {
          for (let i = 0; i < data.length; i++) {
            const com = data[i];


            if(com.pedidos != null) {
            for (let j = 0; j < com.pedidos.length; j++) {
              const pedido = com.pedidos[j];

              if (pedido.subPedidosCocina.estado != "Nada") {
                for (let z = 0; z < pedido.subPedidosCocina.items.length; z++) {
                  const item = pedido.subPedidosCocina.items[z];
                  let encontro: number = -1;

                  for (let q = 0; q < productos.length; q++) {
                    if (productos[q].nombre == item.nombre) {
                      encontro = q;
                    }
                  }

                  if (encontro > -1) {
                    productos[encontro].cantidad += item.cantidad;
                  } else {
                    const p: IListaProductos = {nombre: item.nombre, cantidad: item.cantidad};
                    productos.push(p);
                  }
                }
              }

              if (pedido.subPedidosBebida.estado != "Nada") {
                for (let z = 0; z < pedido.subPedidosBebida.items.length; z++) {
                  const item = pedido.subPedidosBebida.items[z];
                  let encontro: number = -1;

                  for (let q = 0; q < productos.length; q++) {
                    if (productos[q].nombre == item.nombre) {
                      encontro = q;
                    }
                  }

                  if (encontro > -1) {
                    productos[encontro].cantidad += item.cantidad;
                  } else {
                    const p: IListaProductos = {nombre: item.nombre, cantidad: item.cantidad};
                    productos.push(p);
                  }
                }
              }

              if (pedido.subPedidosCerveza.estado != "Nada") {
                for (let z = 0; z < pedido.subPedidosCerveza.items.length; z++) {
                  const item = pedido.subPedidosCerveza.items[z];
                  let encontro: number = -1;

                  for (let q = 0; q < productos.length; q++) {
                    if (productos[q].nombre == item.nombre) {
                      encontro = q;
                    }
                  }

                  if (encontro > -1) {
                    productos[encontro].cantidad += item.cantidad;
                  } else {
                    const p: IListaProductos = {nombre: item.nombre, cantidad: item.cantidad};
                    productos.push(p);
                  }
                }
              }

            }
          }



          }

          resolve(productos);
      });
    });
  }
}

interface IListaProductos {
  nombre: string;
  cantidad: number;
}
