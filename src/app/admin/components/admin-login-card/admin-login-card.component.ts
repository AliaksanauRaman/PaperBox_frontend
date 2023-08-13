import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { JWT_TOKEN_DECODER } from '../../../core/services/jwt-token-decoder/injection-token';
import { UserTokenStateService } from '../../../state/user-token/user-token-state.service';
import { LoginService } from '../../../shared/services/login.service';
import { RoutingService } from '../../../core/services/routing.service';

import { LoginDto } from '../../../shared/dtos/login.dto';
import { UserRole } from '../../../shared/enums/user-role.enum';

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

  private readonly _jwtTokenDecoder = inject(JWT_TOKEN_DECODER);
  private readonly _userTokenStateService = inject(UserTokenStateService);

  protected readonly _loginState$ = this._logInService.state$.pipe(
    tap((state) => {
      if (state.inProgress) {
        this._loginForm.disable();
      } else if (state.error !== null) {
        this._loginForm.enable();
      } else if (state.data !== null) {
        const decodedUserToken = this._jwtTokenDecoder.decode(state.data.token);

        if (
          decodedUserToken.getData().permissions[0].authority !== UserRole.ADMIN
        ) {
          this._notAdminError = true;
          this._loginForm.enable();
        } else {
          this._userTokenStateService.set(state.data.token);
          this._routingService.navigateToAdminHome();
        }
      }
    })
  );
  protected readonly _loginForm = this._formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  protected _notAdminError = false;

  constructor(
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _logInService: LoginService,
    private readonly _routingService: RoutingService
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
    if (this._loginForm.invalid) {
      return;
    }

    this._notAdminError = false;
    const formValue = this._loginForm.getRawValue();
    this._logInService.performRequest(
      new LoginDto(formValue.email, formValue.password)
    );
  }
}
