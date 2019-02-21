import { Component, OnInit } from '@angular/core';
import { GraficosService } from '../../../providers/graficos.service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-grafico1',
  templateUrl: './grafico1.component.html',
  styleUrls: ['./grafico1.component.scss']
})
export class Grafico1Component implements OnInit{
  public barChartLabels: string[] = ['Mas vendidos'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  // public barChartData2:any[] = [
  //   {data: [65], label: 'Carne'},
  //   {data: [28], label: 'Pollo'}
  // ];

  public barChartData: any[] = [];


   constructor(private _graf: GraficosService) {
  }

  ngOnInit() {
    this.traerDatos();
  }

  traerDatos() {
    this._graf.traerProductosMasVendidos().then((data: IListaProductos[]) => {

      this.barChartData.push({data: [0], label: ""});
      for (let i = 0; i < data.length; i++) {
        this.barChartData.push({data: [data[i].cantidad], label: data[i].nombre});
      }

      console.log(this.barChartData);
    });
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };


  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }

}

interface IListaProductos {
  nombre: string;
  cantidad: number;
}
