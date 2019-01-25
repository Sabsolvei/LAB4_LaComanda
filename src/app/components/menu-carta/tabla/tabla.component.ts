import { PeriodicElement } from './../menu-carta.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ISubpedidoItem } from 'src/app/clases/ISubpedidoItem';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {


  @Input() datos: PeriodicElement[];
  public displayedColumns: string[] = ['position', 'nombre', 'precio', 'tiempo', 'cantidad'];
  public dataSource = new MatTableDataSource(this.datos);
  public subTotal: number = 0;

  constructor() { 
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.datos);
  }

  public applyFilter(filterValue: string) {
    console.log(this.dataSource.data);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public sumarCantidad(item: ISubpedidoItem, value: number) {
    item.cantidad = item.cantidad + value;
    //  this.subTotal = parseInt(this.subTotal.toString()) + parseInt(item.importe.toString());
  }
  public restarCantidad(item: ISubpedidoItem, value: number) {
    if (item.cantidad > 0) {
      item.cantidad = item.cantidad + value;
      //   this.subTotal = parseInt(this.subTotal.toString()) - parseInt(item.importe.toString());
    }
  }

}
