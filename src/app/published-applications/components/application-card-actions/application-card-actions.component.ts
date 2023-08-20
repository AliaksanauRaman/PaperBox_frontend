import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';

import { DeleteButtonComponent } from '@shared/components/delete-button/delete-button.component';

@Component({
  selector: 'app-application-card-actions',
  templateUrl: './application-card-actions.component.html',
  styleUrls: ['./application-card-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DeleteButtonComponent],
})
export class ApplicationCardActionsComponent {
  @Input()
  @HostBinding('class.shown-on-desktop')
  public isShownOnDesktop = false;

  @Output()
  public readonly delete = new EventEmitter<void>();

  protected handleDeleteButtonClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.delete.emit();
  }
}
