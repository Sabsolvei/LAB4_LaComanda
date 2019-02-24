import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appElevate]'
})
export class ElevateDirective {

  public elemento;
  public renderer;

  constructor(elem: ElementRef, rend: Renderer2) {
    this.elemento = elem;
    this.renderer = rend;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.elemento.nativeElement, 'box-shadow', '1px 7px 7px rgba(0, 0, 0, .40)');
    this.renderer.setStyle(this.elemento.nativeElement, 'transform', 'translate(0, -4px)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.elemento.nativeElement, 'box-shadow', '');
    this.renderer.setStyle(this.elemento.nativeElement, 'transform', '');

  }


}
