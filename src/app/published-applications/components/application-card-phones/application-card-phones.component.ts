import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PhoneHrefPipe } from '@shared/pipes/phone-href.pipe';
import { PhoneViewPipe } from '@shared/pipes/phone-view.pipe';

import { ListOfPhoneEntities } from '@shared/entities/phone.entity';

@Component({
  selector: 'app-application-card-phones',
  templateUrl: './application-card-phones.component.html',
  styleUrls: ['./application-card-phones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, TranslateModule, PhoneHrefPipe, PhoneViewPipe],
})
export class ApplicationCardPhonesComponent {
  @Input()
  public set listOfPhones(value: ListOfPhoneEntities) {
    this._listOfPhones = value;
  }

  protected _listOfPhones: ListOfPhoneEntities = [];
}
