import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScale]',
  standalone: true,
})
export class ScaleDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.scale(1.1);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.scale(1.0);
  }

  private scale(factor: number) {
    this.el.nativeElement.style.transition = 'all 0.2s';
    this.el.nativeElement.style.transform = `scale(${factor})`;
  }
}
