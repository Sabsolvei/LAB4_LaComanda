import { ISubpedido } from "./ISubpedido";

export interface ISubpedidoCerveza extends ISubpedido {

    items: {
        cantidad: number;
        bebidaID: number;
        nombre: string;
    }[];
}
