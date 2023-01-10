import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AppLanguagesService } from './core/services/app-languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly languagesService: AppLanguagesService,
  ) {}

  public ngOnInit(): void {
    this.languagesService.setUp();
  }
}
