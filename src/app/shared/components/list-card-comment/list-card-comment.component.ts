import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-card-comment',
  templateUrl: './list-card-comment.component.html',
  styleUrls: ['./list-card-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCardCommentComponent {
  @Input()
  public set text(value: string) {
    this._text = value;
  }

  public get text(): string {
    return this._text.trim();
  }

  @Input()
  public set showLabel(value: boolean) {
    this._showLabel = value;
  }

  public get showLabel(): boolean {
    return this._showLabel;
  }

  private _text = '';
  private _showLabel = true;
}
