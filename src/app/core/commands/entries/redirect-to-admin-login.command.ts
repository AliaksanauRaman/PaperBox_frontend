import { RoutingService } from '../../services/routing.service';

import { CommandInterface } from '../command.interface';

export class RedirectToAdminLoginCommand implements CommandInterface {
  public static readonly Label = 'admin:login';

  constructor(private readonly routingService: RoutingService) {}

  public execute(): void {
    this.routingService.navigateToAdminLogin();
  }
}
