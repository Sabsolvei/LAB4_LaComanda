import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'llamandoMozo'
})
export class LlamandoMozoPipe implements PipeTransform {

  transform(value: any, estado: any): any {
    if (value == 'LLAMAR' && estado == 'Llamando') {
      return 'LLAMANDO...';
    } 
    else if (value == 'LLAMAR' && estado != 'Llamando') {
      return 'LLAMAR';
    } 
    else if (value == 'PAGAR' && estado == 'Cobrar') {
      return 'ESPERE UN MOMENTO...';
    }
    else if (value == 'PAGAR' && estado != 'Cobrar') {
      return 'PAGAR';
    }
  }

  // transform(value: number, exponent: string): number {
  //   let exp = parseFloat(exponent);
  //   return Math.pow(value, isNaN(exp) ? 1 : exp);
  // }

}
