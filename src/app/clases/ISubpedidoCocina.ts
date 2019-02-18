import { ISubpedido } from "./ISubpedido";

export interface ISubpedidoCocina extends ISubpedido {

    items: {
        cantidad: number;
        platoID: number;
        nombre: string;
        precio: number;
    }[];
}
