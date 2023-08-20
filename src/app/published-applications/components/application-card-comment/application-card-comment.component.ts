import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-application-card-comment',
  templateUrl: './application-card-comment.component.html',
  styleUrls: ['./application-card-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, TranslateModule],
})
export class ApplicationCardCommentComponent {
  @Input()
  public set comment(value: string) {
    this._comment = value.trim();
  }

  protected _comment = '';
}
