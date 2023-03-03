import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login-card',
  templateUrl: './admin-login-card.component.html',
  styleUrls: ['./admin-login-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginCardComponent {
  public readonly loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  public handleAdminLoginSubmit(event: SubmitEvent): void {
    // TODO
    console.log(this.loginForm.getRawValue());
  }
}
