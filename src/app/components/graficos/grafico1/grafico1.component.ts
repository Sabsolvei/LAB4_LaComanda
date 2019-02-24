import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GraficosService } from '../../../providers/graficos.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-grafico1',
  templateUrl: './grafico1.component.html',
  styleUrls: ['./grafico1.component.scss']
})
export class Grafico1Component implements OnInit{
  @ViewChild("content") content: ElementRef;

  public barChartLabels: string[] = ['Mas vendidos'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public fechaHoy: Date;
  // public barChartData2:any[] = [
  //   {data: [65], label: 'Carne'},
  //   {data: [28], label: 'Pollo'}
  // ];

  public barChartData: any[] = [];



   constructor(private _graf: GraficosService) {
     this.fechaHoy = new Date();
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

  public generatePDF()
  {
  var data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  const imgWidth = 208;
  const pageHeight = 295;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  const heightLeft = imgHeight;

  const contentDataURL = canvas.toDataURL('image/png');
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  pdf.save('MYPdf.pdf'); // Generated PDF
  });
  }

  // exportPDF() {
  //   const doc = new jsPDF();

  //   const spetialELementHandlers = {
  //     "#editor": function(element, renderer) {
  //       return true;
  //     }
  //   };

  //   let content = this.content.nativeElement;

  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     'width': 190,
  //     'elementHandlers': spetialELementHandlers
  //   });

  //   doc.save("grafico1.pdf");
  // }

}

interface IListaProductos {
  nombre: string;
  cantidad: number;
}
