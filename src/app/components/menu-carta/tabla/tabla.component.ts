import { IProducto } from './../../../clases/IProducto';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ISubpedidoItem } from 'src/app/clases/ISubpedidoItem';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() datos: IProducto[];
  public displayedColumns: string[] = ['tiempo', 'nombre', 'descripcion', 'precio', 'cantidad'];
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
  }
  public restarCantidad(item: ISubpedidoItem, value: number) {
    if (item.cantidad > 0) {
      item.cantidad = item.cantidad + value;
    }
  }

}
