import { ISubpedido } from "./ISubpedido";

export interface ISubpedidoComida extends ISubpedido {

    items: {
        cantidad:number;
        idProductoComida:number;
    }[]
}