import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-white-square-button',
  templateUrl: './white-square-button.component.html',
  styleUrls: ['./white-square-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatRippleModule]
})
export class WhiteSquareButtonComponent {
  @Input()
  public set title(value: string) {
    this._title = value;
  }

  public _title = '';
}
