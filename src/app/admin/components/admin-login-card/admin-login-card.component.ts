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
  private readonly firstInputElementRef!: ElementRef<HTMLInputElement>;

  public readonly loginState$ = this.loginService.state$.pipe(
    tap((state) => {
      if (state.inProgress) {
        this.loginForm.disable();
      } else {
        this.loginForm.enable();
      }
    })
  );
  public readonly loginForm = this.formBuilder.group({
    number: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly loginService: LoginService
  ) {}

  public ngAfterViewInit(): void {
    // It is needed to not trigger validation error
    setTimeout(() => {
      this.firstInputElementRef.nativeElement.focus();
    }, 100);
  }

  public ngOnDestroy(): void {
    this.loginService.destroyRequest();
  }

  public handleAdminLoginSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.getRawValue();
    this.loginService.performRequest(
      new LoginDto(
        { diallingCode: '', number: formValue.number },
        formValue.password
      )
    );
  }
}
