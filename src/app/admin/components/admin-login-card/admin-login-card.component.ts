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

import { LogInService } from '../../../shared/services/log-in.service';

import { LogInDto } from '../../../shared/dtos/log-in.dto';

@Component({
  selector: 'app-admin-login-card',
  templateUrl: './admin-login-card.component.html',
  styleUrls: ['./admin-login-card.component.scss'],
  providers: [LogInService],
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
    private readonly _logInService: LogInService
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
      new LogInDto(formValue.email, formValue.password)
    );
  }
}
