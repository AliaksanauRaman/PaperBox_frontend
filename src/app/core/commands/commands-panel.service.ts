import { Injectable } from '@angular/core';

import { RoutingService } from '../services/routing.service';
import { UserService } from '../../shared/services/user.service';

import { CommandInterface } from './command.interface';
import { RedirectToAdminHomeCommand } from './entries/redirect-to-admin-home.command';
import { RedirectToAdminLoginCommand } from './entries/redirect-to-admin-login.command';
import { RedirectToHomeCommand } from './entries/redirect-to-home.command';
import { LogUserCommand } from './entries/log-user.command';

@Injectable({
  providedIn: 'root',
})
export class CommandsPanelService {
  private readonly COMMAND_MAP = new Map<string, CommandInterface>([
    [
      RedirectToAdminHomeCommand.Label,
      new RedirectToAdminHomeCommand(this._routingService),
    ],
    [
      RedirectToAdminLoginCommand.Label,
      new RedirectToAdminLoginCommand(this._routingService),
    ],
    [
      RedirectToHomeCommand.Label,
      new RedirectToHomeCommand(this._routingService),
    ],
    [LogUserCommand.Label, new LogUserCommand(this._userService)],
  ]);

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _userService: UserService
  ) {}

  public show(): void {
    const rawInput = prompt('Run command:');

    if (rawInput === null) {
      return;
    }

    const commandLabel = rawInput.trim().toLowerCase();
    this.executeCommand(commandLabel);
  }

  private executeCommand(commandLabel: string): void {
    const command = this.COMMAND_MAP.get(commandLabel);

    if (command === undefined) {
      console.warn(`No command '${commandLabel}' found :(`);
      return;
    }

    command.execute();
  }
}
