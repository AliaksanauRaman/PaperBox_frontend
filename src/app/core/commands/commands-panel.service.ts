import { Injectable, Injector, inject } from '@angular/core';

import { COMMAND_MAP } from './command-map';

@Injectable({
  providedIn: 'root',
})
export class CommandsPanelService {
  private readonly _injector = inject(Injector);
  private readonly _commandMap = inject(COMMAND_MAP);

  public show(): void {
    const rawInput = prompt('Run command:');

    if (rawInput === null) {
      return;
    }

    const commandLabel = rawInput.trim().toLowerCase();
    this.executeCommand(commandLabel);
  }

  private executeCommand(commandLabel: string): void {
    const command = this._commandMap[commandLabel];

    if (command === undefined) {
      alert(`No command '${commandLabel}' found :(`);
      return;
    }

    this._injector.get(command).execute();
  }
}
