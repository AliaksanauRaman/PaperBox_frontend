import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PlusIconModule } from '../../icons/plus-icon/plus-icon.module';

@Component({
  selector: 'app-close-dialog-button',
  templateUrl: './close-dialog-button.component.html',
  styleUrls: ['./close-dialog-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, MatTooltipModule, PlusIconModule],
})
export class CloseDialogButtonComponent {}
