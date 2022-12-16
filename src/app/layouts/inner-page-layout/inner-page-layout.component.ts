import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inner-page-layout',
  templateUrl: './inner-page-layout.component.html',
  styleUrls: ['./inner-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnerPageLayoutComponent {

}
