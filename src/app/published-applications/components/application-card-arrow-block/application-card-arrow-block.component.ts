import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ArrowDownIconModule } from '@shared/icons/arrow-down-icon/arrow-down-icon.module';

@Component({
  selector: 'app-application-card-arrow-block',
  templateUrl: './application-card-arrow-block.component.html',
  styleUrls: ['./application-card-arrow-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ArrowDownIconModule],
})
export class ApplicationCardArrowBlockComponent {
  @Input()
  public set isActive(value: boolean) {
    this._isActive = value;
  }

  @Input()
  public set isTurned(value: boolean) {
    this._isTurned = value;
  }

  protected _isActive = false;
  protected _isTurned = false;
}
