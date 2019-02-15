import { ISubpedidoCocina } from "./ISubpedidoCocina";
import { ISubpedidoBebida } from "./ISubpedidoBebida";
import { ISubpedidoCerveza } from "./ISubpedidoCerveza";

export interface IComandaPedido {
  id: number;
  estado: string; //pendiente, derivado, entregado
  codigoPedido?: string;
  subPedidosCocina?: ISubpedidoCocina;
  subPedidosBebida?: ISubpedidoBebida;
  subPedidosCerveza?: ISubpedidoCerveza;
  tiempoMayorEstimado?: number;
  horaDerivado?: number;
}