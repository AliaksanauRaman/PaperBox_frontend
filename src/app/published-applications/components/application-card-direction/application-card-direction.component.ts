import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LocationLabelPipe } from '@shared/pipes/location-label.pipe';

@Component({
  selector: 'app-application-card-direction',
  templateUrl: './application-card-direction.component.html',
  styleUrls: ['./application-card-direction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, LocationLabelPipe],
})
export class ApplicationCardDirectionComponent {
  @Input()
  public set locationFrom(value: string) {
    this._locationFrom = value;
  }

  @Input()
  public set locationTo(value: string) {
    this._locationTo = value;
  }

  @Input()
  @HostBinding('class.active')
  public isActive = false;

  protected _locationFrom = '';
  protected _locationTo = '';
}
