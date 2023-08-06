import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { SignupService } from '../../../shared/services/signup.service';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';
import { InfoNotificationService } from '../../../core/services/info-notification.service';
import { SignupErrorFactory } from '../../factories/signup-error.factory';

import { CustomValidators } from '../../../shared/classes/custom-validators.class';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  providers: [SignupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  protected readonly _signupRequestState$ = this._signupService.state$.pipe(
    tap((state) => {
      if (state.inProgress) {
        this._signupForm.disable();
      } else if (state.data !== null) {
        this._infoNotificationService.showImportantMessage(
          'info.accountIsCreatedButNotActivated'
        );
        this._signupForm.reset();
        this._signupForm.enable();
      } else if (state.error !== null) {
        this._signupForm.enable();
        const signUpError = this._signupErrorFactory.build(state.error);
        this._errorNotificationService.showMessage(signUpError.message);
      }
    })
  );
  protected readonly _signupForm = this._formBuilder.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.emailFormat]],
      password: ['', [Validators.required, CustomValidators.passwordFormat]],
      confirmPassword: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
      personalDataAgreementConfirmation: [false, [Validators.requiredTrue]],
    },
    { validators: [CustomValidators.passwordsMatch] }
  );

  constructor(
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _signupService: SignupService,
    private readonly _errorNotificationService: ErrorNotificationService,
    private readonly _infoNotificationService: InfoNotificationService,
    private readonly _signupErrorFactory: SignupErrorFactory
  ) {}

  protected handleSignupSubmit(event: SubmitEvent): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this._signupForm.invalid) {
      throw new Error('Signup form is invalid!');
    }

    const { fullName, email, password } = this._signupForm.getRawValue();
    const signupDto = { fullName, email, password };
    this._signupService.performRequest(signupDto);
  }
}
