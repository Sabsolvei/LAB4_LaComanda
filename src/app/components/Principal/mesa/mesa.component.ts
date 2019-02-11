import { Component, OnInit, Input } from '@angular/core';
import { IMesa } from 'src/app/clases/IMesa';
import { MesaService } from '../../../providers/mesa/mesa.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {
  @Input() public mesa: IMesa;


  constructor(public _mesa: MesaService) { }

  ngOnInit() {
  }

}
