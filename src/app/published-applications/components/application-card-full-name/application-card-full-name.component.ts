import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-application-card-full-name',
  templateUrl: './application-card-full-name.component.html',
  styleUrls: ['./application-card-full-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ApplicationCardFullNameComponent {
  @Input()
  public set fullName(value: string) {
    this._fullName = value;
  }

  protected _fullName = '';
}
