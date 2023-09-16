import { Injectable, inject } from '@angular/core';

import { CommandInterface } from '../command.interface';
import { COMMAND_MAP } from '../command-map';

@Injectable({
  providedIn: 'root',
})
export class HelpCommand implements CommandInterface {
  private readonly _commandMap = inject(COMMAND_MAP);

  public static readonly Label = 'help';

  public execute(): void {
    alert(this.buildOutput());
  }

  private buildOutput(): string {
    return `> Available commands: \n${Object.keys(this._commandMap).join(
      '\n'
    )}`;
  }
}
