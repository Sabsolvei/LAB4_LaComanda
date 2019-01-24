import { ISubpedido } from "./ISubpedido";

export interface ISubpedidoCerveza extends ISubpedido {

    items: {
        cantidad:number;
        idProductoCerveza:number;
    }[]
}