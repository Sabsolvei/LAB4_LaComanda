import { Component, OnInit } from '@angular/core';
import { GraficosService } from '../../../providers/graficos.service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-grafico1',
  templateUrl: './grafico1.component.html',
  styleUrls: ['./grafico1.component.scss']
})
export class Grafico1Component implements OnInit{
   // Doughnut
   // public listaLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
   public listaLabels:string[] = [];

  //  private lisLabels$ = new ReplaySubject<string>();
  //  private lisData$ = new ReplaySubject<number>();

   // public listaData:number[] = [350, 450, 100];
   public listaData:number[] = [];
   public doughnutChartType:string = 'doughnut';

   // events
   public chartClicked(e:any):void {
     console.log(e);
   }

   public chartHovered(e:any):void {
     console.log(e);
   }

   constructor(private _graf: GraficosService) {
    //this.traerDatos();
  }

  // get listaLabels(): Observable<string> {
  //   return this.lisLabels$.asObservable();
  // }

  // get listaData(): Observable<number> {
  //   return this.lisData$.asObservable();
  // }

  ngOnInit() {
    this.traerDatos();
  }

  traerDatos() {
    this._graf.traerProductosMasVendidos().then((data: IListaProductos[]) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        // this.lisLabels$.next(data[i].nombre);
        // this.lisData$.next(data[i].cantidad);

        // console.log(this.lisData$);
        this.listaLabels.push(data[i].nombre);
        this.listaData.push(data[i].cantidad);
      }
    });
  }
}

interface IListaProductos {
  nombre: string;
  cantidad: number;
}
