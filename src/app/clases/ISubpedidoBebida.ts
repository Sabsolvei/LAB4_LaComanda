import { ISubpedido } from "./ISubpedido";

export interface ISubpedidoBebida extends ISubpedido {

    items: {
        cantidad:number;
        idProductoBebida:number;
    }[]
}