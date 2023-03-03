import { RoutingService } from '../../services/routing.service';

import { CommandInterface } from '../command.interface';

export class RedirectToAdminCommand implements CommandInterface {
  public static readonly Label = 'admin';

  constructor(private readonly routingService: RoutingService) {}

  public execute(): void {
    this.routingService.navigateToAdmin();
  }
}
