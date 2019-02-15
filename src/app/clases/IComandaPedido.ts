import { ISubpedidoComida } from "./ISubpedidoComida";
import { ISubpedidoBebida } from "./ISubpedidoBebida";
import { ISubpedidoCerveza } from "./ISubpedidoCerveza";

export interface IComandaPedido {
  id: number;
  estado: string; //pendiente, derivado, entregado
  codigoPedido?: string;
  subPedidosComida?: ISubpedidoComida;
  subPedidosBebida?: ISubpedidoBebida;
  subPedidosCerveza?: ISubpedidoCerveza;
  tiempoMayorEstimado?: number;
  horaDerivado?: number;
}
