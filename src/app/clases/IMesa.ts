export interface IMesa {
    key?:string;
    idMesa: number;
    numero: number;
    capacidad: string;
    codigoQr: string;
    tipo: string;
    //img: string;
    estado: string; //libre // esperando pedido // comiendo // pagando // cerrada
    comanda: number;
  }
  