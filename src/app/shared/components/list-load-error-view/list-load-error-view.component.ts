import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-list-load-error-view',
  templateUrl: './list-load-error-view.component.html',
  styleUrls: ['./list-load-error-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListLoadErrorViewComponent {
  @Output()
  public readonly reloadClick = new EventEmitter<void>();

  public handleReloadButtonClick(): void {
    this.reloadClick.emit();
  }
}
