import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoHora'
})
export class FormatoHoraPipe implements PipeTransform {

  transform(fechaHora: string, ...args) {
    //return fechaHora.toLowerCase();
    let derivado: Date = new Date(fechaHora);
    let fecha = derivado.toString();
    console.log("PIPE FECHA HORA");
    console.log(derivado);
    console.log(fecha);
    if(fecha){
      let formateada = fecha.substring(16, 21);
     // formateada = formateada + "/" + fecha.substring(2,4);
     // formateada = formateada + "/" + fecha.substring(4);
      return formateada;
    }
    else{
      return '';
    }
  }

}
