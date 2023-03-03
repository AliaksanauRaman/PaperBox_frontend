import { RoutingService } from '../../services/routing.service';

import { CommandInterface } from '../command.interface';

export class RedirectToHomeCommand implements CommandInterface {
  public static readonly Label = 'home';

  constructor(private readonly routingService: RoutingService) {}

  public execute(): void {
    this.routingService.navigateToHome();
  }
}
