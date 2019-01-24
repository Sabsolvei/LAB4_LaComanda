import { Component, OnInit, Input } from '@angular/core';
import { IMesa } from 'src/app/clases/IMesa';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {
  @Input() public mesa: IMesa;
  

  constructor() { }

  ngOnInit() {
  }

}
