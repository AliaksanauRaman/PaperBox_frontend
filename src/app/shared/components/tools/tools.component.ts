import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { LeaveFeedbackButtonComponent } from '../leave-feedback-button/leave-feedback-button.component';
import { AccountButtonComponent } from '../account-button/account-button.component';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { AccountMenuComponent } from '../account-menu/account-menu.component';

import { CreateFeedbackDialogService } from '../../../core/services/create-feedback-dialog.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatMenuModule,
    LanguageSwitcherComponent,
    LeaveFeedbackButtonComponent,
    AccountButtonComponent,
    LoginButtonComponent,
    AccountMenuComponent,
  ],
})
export class ToolsComponent {
  @Input()
  public set isCompact(value: boolean) {
    this._isCompact = value;
  }

  @Input()
  public set isUserLoggedIn(value: boolean) {
    this._isUserLoggedIn = value;
  }

  protected _isCompact = false;
  protected _isUserLoggedIn = false;

  constructor(
    private readonly createFeedbackDialogService: CreateFeedbackDialogService
  ) {}

  public handleLeaveFeedbackButtonClick(): void {
    this.createFeedbackDialogService.openDialog();
  }
}
