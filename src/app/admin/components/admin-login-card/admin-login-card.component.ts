import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RoutingService } from '../../../core/services/routing.service';

@Component({
  selector: 'app-admin-login-card',
  templateUrl: './admin-login-card.component.html',
  styleUrls: ['./admin-login-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginCardComponent {
  constructor(
    private readonly routingService: RoutingService,
  ) {}

  public handleLoginButtonClick(): void {
    this.routingService.navigateToAdmin();
  }
}
