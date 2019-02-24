import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

  transform(fechaHoy: Date, ...args) {
    let fecha = fechaHoy.toString().substring(4, 15).split(' ', 3);
    let resultado = fecha[1] + ' ' + fecha[0] + ' ' + fecha[2];
    return resultado.toUpperCase();
  }

}
