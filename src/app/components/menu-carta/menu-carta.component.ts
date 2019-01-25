import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ISubpedidoItem } from 'src/app/clases/ISubpedidoItem';

export interface PeriodicElement {
  nombre: string;
  position: number;
  precio: number;
  tiempo: string;
  cantidad: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, nombre: 'Hydrogen', precio: 1.0079, tiempo: 'H', cantidad: 0 },
  { position: 2, nombre: 'Helium', precio: 4.0026, tiempo: 'He', cantidad: 0 },
  { position: 3, nombre: 'Lithium', precio: 6.941, tiempo: 'Li', cantidad: 0 },
  { position: 4, nombre: 'Beryllium', precio: 9.0122, tiempo: 'Be', cantidad: 0 },
  { position: 5, nombre: 'Boron', precio: 10.811, tiempo: 'B', cantidad: 0 },
  { position: 6, nombre: 'Carbon', precio: 12.0107, tiempo: 'C', cantidad: 0 },
  { position: 7, nombre: 'Nitrogen', precio: 14.0067, tiempo: 'N', cantidad: 0 },
  { position: 8, nombre: 'Oxygen', precio: 15.9994, tiempo: 'O', cantidad: 0 },
  { position: 9, nombre: 'Fluorine', precio: 18.9984, tiempo: 'F', cantidad: 0 },
  { position: 10, nombre: 'Neon', precio: 20.1797, tiempo: 'Ne', cantidad: 0 },
];

@Component({
  selector: 'app-menu-carta',
  templateUrl: './menu-carta.component.html',
  styleUrls: ['./menu-carta.component.scss']
})
export class MenuCartaComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['position', 'nombre', 'precio', 'tiempo', 'cantidad'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  public subTotal: number = 0;

  public pedidoCocina: any[];
  public pedidoBartender: any[];
  public pedidoCerveza: any[];

  public cargarPedido() {
    this.pedidoCocina = (this.datosPlatos.filter(p => p.cantidad > 0)).concat(this.datosPostres.filter(p => p.cantidad));
    this.pedidoCerveza = this.datosCervezas.filter(p => p.cantidad > 0);
    this.pedidoBartender = this.datosBebidas.filter(p => p.cantidad > 0);

    console.log(this.pedidoCocina);
    console.log(this.pedidoBartender);
    console.log(this.pedidoCerveza);

  }

  public datosPlatos: PeriodicElement[] = [
    { position: 1, nombre: 'Hydrogen', precio: 1.0079, tiempo: 'H', cantidad: 0 },
    { position: 2, nombre: 'Helium', precio: 4.0026, tiempo: 'He', cantidad: 0 },
    { position: 3, nombre: 'Lithium', precio: 6.941, tiempo: 'Li', cantidad: 0 },
    { position: 4, nombre: 'Beryllium', precio: 9.0122, tiempo: 'Be', cantidad: 0 },
    { position: 5, nombre: 'Boron', precio: 10.811, tiempo: 'B', cantidad: 0 },
    { position: 6, nombre: 'Carbon', precio: 12.0107, tiempo: 'C', cantidad: 0 },
    { position: 7, nombre: 'Nitrogen', precio: 14.0067, tiempo: 'N', cantidad: 0 },
    { position: 8, nombre: 'Oxygen', precio: 15.9994, tiempo: 'O', cantidad: 0 },
    { position: 9, nombre: 'Fluorine', precio: 18.9984, tiempo: 'F', cantidad: 0 },
    { position: 10, nombre: 'Neon', precio: 20.1797, tiempo: 'Ne', cantidad: 0 },
  ];

  public datosPostres: PeriodicElement[] = [
    { position: 1, nombre: 'Hydrogen', precio: 1.0079, tiempo: 'H', cantidad: 0 },
    { position: 2, nombre: 'Helium', precio: 4.0026, tiempo: 'He', cantidad: 0 },
    { position: 3, nombre: 'Lithium', precio: 6.941, tiempo: 'Li', cantidad: 0 },
    { position: 4, nombre: 'Beryllium', precio: 9.0122, tiempo: 'Be', cantidad: 0 },
    { position: 5, nombre: 'Boron', precio: 10.811, tiempo: 'B', cantidad: 0 },
    { position: 6, nombre: 'Carbon', precio: 12.0107, tiempo: 'C', cantidad: 0 },
    { position: 7, nombre: 'Nitrogen', precio: 14.0067, tiempo: 'N', cantidad: 0 },
    { position: 8, nombre: 'Oxygen', precio: 15.9994, tiempo: 'O', cantidad: 0 },
    { position: 9, nombre: 'Fluorine', precio: 18.9984, tiempo: 'F', cantidad: 0 },
    { position: 10, nombre: 'Neon', precio: 20.1797, tiempo: 'Ne', cantidad: 0 },
  ];


  public datosBebidas: PeriodicElement[] = [
    { position: 1, nombre: 'Hydrogen', precio: 1.0079, tiempo: 'H', cantidad: 0 },
    { position: 2, nombre: 'Helium', precio: 4.0026, tiempo: 'He', cantidad: 0 },
    { position: 3, nombre: 'Lithium', precio: 6.941, tiempo: 'Li', cantidad: 0 },
    { position: 4, nombre: 'Beryllium', precio: 9.0122, tiempo: 'Be', cantidad: 0 },
    { position: 5, nombre: 'Boron', precio: 10.811, tiempo: 'B', cantidad: 0 },
    { position: 6, nombre: 'Carbon', precio: 12.0107, tiempo: 'C', cantidad: 0 },
    { position: 7, nombre: 'Nitrogen', precio: 14.0067, tiempo: 'N', cantidad: 0 },
    { position: 8, nombre: 'Oxygen', precio: 15.9994, tiempo: 'O', cantidad: 0 },
    { position: 9, nombre: 'Fluorine', precio: 18.9984, tiempo: 'F', cantidad: 0 },
    { position: 10, nombre: 'Neon', precio: 20.1797, tiempo: 'Ne', cantidad: 0 },
  ];


  public datosCervezas: PeriodicElement[] = [
    { position: 1, nombre: 'Hydrogen', precio: 1.0079, tiempo: 'H', cantidad: 0 },
    { position: 2, nombre: 'Helium', precio: 4.0026, tiempo: 'He', cantidad: 0 },
    { position: 3, nombre: 'Lithium', precio: 6.941, tiempo: 'Li', cantidad: 0 },
    { position: 4, nombre: 'Beryllium', precio: 9.0122, tiempo: 'Be', cantidad: 0 },
    { position: 5, nombre: 'Boron', precio: 10.811, tiempo: 'B', cantidad: 0 },
    { position: 6, nombre: 'Carbon', precio: 12.0107, tiempo: 'C', cantidad: 0 },
    { position: 7, nombre: 'Nitrogen', precio: 14.0067, tiempo: 'N', cantidad: 0 },
    { position: 8, nombre: 'Oxygen', precio: 15.9994, tiempo: 'O', cantidad: 0 },
    { position: 9, nombre: 'Fluorine', precio: 18.9984, tiempo: 'F', cantidad: 0 },
    { position: 10, nombre: 'Neon', precio: 20.1797, tiempo: 'Ne', cantidad: 0 },
  ];


  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

  sumarCantidad(item: ISubpedidoItem, value: number) {
    item.cantidad = item.cantidad + value;
    //  this.subTotal = parseInt(this.subTotal.toString()) + parseInt(item.importe.toString());
    console.log(item.cantidad);
  }
  restarCantidad(item: ISubpedidoItem, value: number) {
    if (item.cantidad > 0) {
      item.cantidad = item.cantidad + value;
      //   this.subTotal = parseInt(this.subTotal.toString()) - parseInt(item.importe.toString());
    }
  }

}
