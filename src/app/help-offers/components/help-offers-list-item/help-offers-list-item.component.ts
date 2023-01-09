import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-help-offers-list-item',
  templateUrl: './help-offers-list-item.component.html',
  styleUrls: ['./help-offers-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpOffersListItemComponent {
  @HostBinding('class.hovered')
  public get isHovered(): boolean {
    return this._isHovered;
  }

  @HostListener('mouseenter')
  public handleHostMouseenter(): void {
    this._isHovered = true;
  }

  @HostListener('mouseleave')
  public handleHostMouseleave(): void {
    this._isHovered = false;
  }

  protected _isHovered = false;
}
