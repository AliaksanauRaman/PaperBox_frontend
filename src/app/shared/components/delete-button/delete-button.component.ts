import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AngularSvgIconModule, TranslateModule, MatTooltipModule],
})
export class DeleteButtonComponent {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  protected _disabled = false;

  @Output()
  public readonly innerClick = new EventEmitter<MouseEvent>();
}
