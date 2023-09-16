import { Injectable } from '@angular/core';

import { RoutingService } from '../../services/routing.service';

import { CommandInterface } from '../command.interface';

@Injectable({
  providedIn: 'root',
})
export class RedirectToAdminHomeCommand implements CommandInterface {
  public static readonly Label = 'admin:home';

  constructor(private readonly routingService: RoutingService) {}

  public execute(): void {
    this.routingService.navigateToAdminHome();
  }
}
