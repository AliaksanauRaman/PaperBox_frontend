import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

// TODO: Remove redundant functionality
@Component({
  selector: 'app-plus-icon',
  templateUrl: './plus-icon.component.html',
  styleUrls: ['./plus-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusIconComponent {
  @HostBinding('style.width')
  public get cssWidth(): string {
    return this._cssWidth;
  }

  @HostBinding('style.height')
  public get cssHeight(): string {
    return this._cssHeight;
  }

  @Input()
  public set width(cssWidth: string) {
    this._cssWidth = cssWidth;
  }

  @Input()
  public set height(cssHeight: string) {
    this._cssHeight = cssHeight;
  }

  private _cssWidth = '18px';
  private _cssHeight = '18px';
}
