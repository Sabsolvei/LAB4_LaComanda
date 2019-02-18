import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.scss']
})
export class PuntajeComponent implements OnInit {

  @Output() enviarPuntaje = new EventEmitter<any>();
  @Input() tema: string;

  constructor() { }

  ngOnInit() {
  }

  public puntuar(puntaje: number) {
    this.enviarPuntaje.emit({ tema: this.tema, puntos: puntaje });
  }

}
