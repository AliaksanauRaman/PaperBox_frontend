import { Directive, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appHover]',
  exportAs: 'hover',
  standalone: true,
})
export class HoverDirective {
  @HostListener('mouseenter')
  public handleHostMouseenter(): void {
    this._isHovered = true;
    this._isHovered$.next(true);
  }

  @HostListener('mouseover')
  public handleHostMouseover(): void {
    if (!this._isHovered) {
      this._isHovered = true;
      this._isHovered$.next(true);
    }
  }

  @HostListener('mouseleave')
  public handleHostMouseleave(): void {
    this._isHovered = false;
    this._isHovered$.next(false);
  }

  public get isHovered(): boolean {
    return this._isHovered;
  }

  private _isHovered = false;
  private readonly _isHovered$ = new BehaviorSubject<boolean>(false);

  public readonly isHovered$ = this._isHovered$.asObservable();

  public unhover(): void {
    this._isHovered = false;
    this._isHovered$.next(false);
  }
}
