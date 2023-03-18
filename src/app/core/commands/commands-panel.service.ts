import { Injectable } from '@angular/core';

import { RoutingService } from '../services/routing.service';

import { CommandInterface } from './command.interface';
import { RedirectToAdminHomeCommand } from './entries/redirect-to-admin-home.command';
import { RedirectToAdminLoginCommand } from './entries/redirect-to-admin-login.command';
import { RedirectToHomeCommand } from './entries/redirect-to-home.command';

@Injectable({
  providedIn: 'root',
})
export class CommandsPanelService {
  private readonly COMMAND_MAP = new Map<string, CommandInterface>([
    [
      RedirectToAdminHomeCommand.Label,
      new RedirectToAdminHomeCommand(this.routingService),
    ],
    [
      RedirectToAdminLoginCommand.Label,
      new RedirectToAdminLoginCommand(this.routingService),
    ],
    [
      RedirectToHomeCommand.Label,
      new RedirectToHomeCommand(this.routingService),
    ],
  ]);

  constructor(private readonly routingService: RoutingService) {}

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
