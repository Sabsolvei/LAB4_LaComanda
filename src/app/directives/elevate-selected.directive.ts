import { MesaService } from './../providers/mesa/mesa.service';
import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appElevateSelected]'
})
export class ElevateSelectedDirective {

  @Input() mesa: number;
  @Input () obs: Observable<number>;
  //@Input() appElevateSelected;
  public nroMesa;
  public renderer;
  public elemento;

  constructor(
    elem: ElementRef,
    rend: Renderer2,
    _mesa: MesaService
  ) {
    console.log("DESDE DIRECTIVA: NUMERO MESAS2222");
    this.elemento = elem;
    this.renderer = rend;
  }

  ngOnInit() {
    this.obs.subscribe(dato =>{
      if (dato == this.mesa) {

          this.renderer.setStyle(this.elemento.nativeElement, 'border', '1px solid black');

          // this.renderer.setStyle(this.elemento.nativeElement, 'box-shadow', '1px 7px 7px rgba(0, 0, 0, .40)');
          // this.renderer.setStyle(this.elemento.nativeElement, 'transform', 'translate(0, -4px)');
      } else {
        this.renderer.setStyle(this.elemento.nativeElement, 'border', '0px solid black');
        // this.renderer.setStyle(this.elemento.nativeElement, 'background-color', '');
        // this.renderer.setStyle(this.elemento.nativeElement, 'box-shadow', '');
        // this.renderer.setStyle(this.elemento.nativeElement, 'transform', '');
      }
    });

    // console.log("DESDE DIRECTIVA: NUMERO MESAS1111");
    
    
  }

}





