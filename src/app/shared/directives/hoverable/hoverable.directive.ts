import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverable]',
})
export class HoverableDirective {
  @HostListener('mouseenter')
  public handleHostMouseenter(): void {
    this._isHovered = true;
  }

  @HostListener('mouseover')
  public handleHostMouseover(): void {
    if (!this._isHovered) {
      this._isHovered = true;
    }
  }

  @HostListener('mouseleave')
  public handleHostMouseleave(): void {
    this._isHovered = false;
  }

  public get isHovered(): boolean {
    return this._isHovered;
  }

  private _isHovered = false;

  public markAsHovered(): void {
    this._isHovered = true;
  }
}
