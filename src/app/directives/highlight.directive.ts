import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() appHighlight: string;

  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    //let shadowStr = `${ this.appShadowX } ${ this.appShadowY } ${ this.appShadowBlur } ${ this.appShadow }`;
    switch (this.appHighlight) {
      case "Libre":
        this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'white');
        break;
      case "Esperando":
        this.renderer.setStyle(this.elem.nativeElement, 'background-color', '#FCE155');
        break;
      case "Comiendo":
        this.renderer.setStyle(this.elem.nativeElement, 'background-color', '#90ABD7');
        break;
      case "Cobrar":
      case "Cobrando":
      case "Llamando":
        this.renderer.setStyle(this.elem.nativeElement, 'border', '3px solid black');
        this.renderer.setStyle(this.elem.nativeElement, '-webkit - animation', 'BLINK 1s infinite');
        this.renderer.setStyle(this.elem.nativeElement, '-moz - animation', 'BLINK 1s infinite');
        this.renderer.setStyle(this.elem.nativeElement, '-o - animation', 'BLINK 1s infinite');
        this.renderer.setStyle(this.elem.nativeElement, 'animation', 'BLINK 1s infinite');
        break;
    }
  }
}
