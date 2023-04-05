import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { LoginService } from '../../../shared/services/login.service';

import { LoginDto } from '../../../shared/dtos/login.dto';

@Component({
  selector: 'app-admin-login-card',
  templateUrl: './admin-login-card.component.html',
  styleUrls: ['./admin-login-card.component.scss'],
  providers: [LoginService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('firstInputRef')
  private readonly _firstInputElementRef!: ElementRef<HTMLInputElement>;

  protected readonly _logInState$ = this._logInService.state$.pipe(
    tap((state) => {
      if (state.inProgress) {
        this._logInForm.disable();
      } else {
        this._logInForm.enable();
      }
    })
  );
  protected readonly _logInForm = this._formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _logInService: LoginService
  ) {}

  public ngAfterViewInit(): void {
    // It is needed to not trigger validation error
    setTimeout(() => {
      this._firstInputElementRef.nativeElement.focus();
    }, 100);
  }

  public ngOnDestroy(): void {
    this._logInService.destroyRequest();
  }

  protected handleAdminLoginSubmit(): void {
    if (this._logInForm.invalid) {
      return;
    }

    const formValue = this._logInForm.getRawValue();
    this._logInService.performRequest(
      new LoginDto(formValue.email, formValue.password)
    );
  }
}
