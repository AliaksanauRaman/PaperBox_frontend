import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-applications-list-load-error-view',
  templateUrl: './applications-list-load-error-view.component.html',
  styleUrls: ['./applications-list-load-error-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsListLoadErrorViewComponent {
  @Output()
  public readonly reloadClick = new EventEmitter<void>();

  protected handleReloadButtonClick(): void {
    this.reloadClick.emit();
  }
}
