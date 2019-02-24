import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = -34.634848; // 51.678418;
  lng: number = -58.359189; // 7.809007;
  icono = {
    url: '../../../assets/bandeja.png',
    scaledSize: {
        width: 40,
        height: 40
    }
};

  // public lat: Number = 24.799448;
  // public lng: Number = 120.979021;

  public origin: any;
  public destination: any;

  constructor() { }

  ngOnInit() {
    this.getDirection();
  }
  // -34.634848,-58.359189
  getDirection() {
    // this.origin = { lat: 24.799448, lng: 120.979021 };
    // this.destination = { lat: -34.634848, lng: -58.359189 };
  }
}
