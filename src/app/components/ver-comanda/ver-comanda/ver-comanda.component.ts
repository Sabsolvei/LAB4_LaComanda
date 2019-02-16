import { Component, OnInit, Input } from '@angular/core';
import { IComanda } from 'src/app/clases/IComanda';

@Component({
  selector: 'app-ver-comanda',
  templateUrl: './ver-comanda.component.html',
  styleUrls: ['./ver-comanda.component.scss']
})
export class VerComandaComponent implements OnInit {

  @Input() public comanda: IComanda;

  constructor() { }

  ngOnInit() {
  }

  nombreBoton() {
    return "Abierta";
  }

}
