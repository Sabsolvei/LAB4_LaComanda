import { ISubpedido } from "./ISubpedido";

export interface ISubpedidoBebida extends ISubpedido {

    items: {
        cantidad: number;
        bebidaID: number;
        bebidaNombre: string;
    }[];
}
