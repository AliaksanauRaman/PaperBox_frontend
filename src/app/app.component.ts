import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppLanguage } from './shared/enums/app-language.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.translateService.setDefaultLang(AppLanguage.BELARUSIAN);
    this.translateService.use(AppLanguage.BELARUSIAN);
  }
}
