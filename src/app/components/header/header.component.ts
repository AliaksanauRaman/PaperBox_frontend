import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { startWith, tap, takeUntil } from 'rxjs';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';
import { AppLanguage } from './../../shared/enums/app-language.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends DestroyEmitter implements OnInit {
  protected readonly selectedLanguageControl = new FormControl(this.translateService.currentLang);
  protected readonly selectedLanguage$ = this.selectedLanguageControl.valueChanges
    .pipe(
      startWith(this.translateService.currentLang),
    );

  protected readonly appLanguage = AppLanguage;

  constructor(
    private readonly translateService: TranslateService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.subToSelectedLanguageChanges();
  }

  private subToSelectedLanguageChanges(): void {
    this.selectedLanguageControl.valueChanges
      .pipe(
        tap(newSelectedLanguage => {
          if (newSelectedLanguage === null) {
            throw new Error('Selected language cannot be equal to null!');
          }

          this.translateService.use(newSelectedLanguage);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
