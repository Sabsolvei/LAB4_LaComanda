export interface IMesa {
    idMesa: number;
    numero: number;
    capacidad: string;
    codigoQr: string;
    tipo: string;
    estado: string; //libre // esperando pedido // comiendo // pagando // cerrada
    comanda: number;
    clienteDni: string;
    clienteNombre: string;
  }
