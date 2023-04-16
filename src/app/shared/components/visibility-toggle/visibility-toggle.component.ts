import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';

import { VisibilityStateType } from '../../types/visibility-state.type';

@Component({
  selector: 'app-visibility-toggle',
  templateUrl: './visibility-toggle.component.html',
  styleUrls: ['./visibility-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgTemplateOutlet],
})
export class VisibilityToggleComponent {
  @Input()
  public set visibilityState(value: VisibilityStateType) {
    this._visibilityState = value;
  }

  @Output()
  public readonly nextVisibilityState = new EventEmitter<VisibilityStateType>();

  protected _visibilityState: VisibilityStateType = 'hidden';

  protected handleVisibilityToggleClick(): void {
    this.nextVisibilityState.emit(
      this._visibilityState === 'hidden' ? 'visible' : 'hidden'
    );
  }
}
