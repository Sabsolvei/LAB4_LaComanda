import { IProducto } from "./IProducto";

export interface ISubpedidoItem extends IProducto {
    idSubpedidoItem: number;
    cantidad: number;
}