import { Injectable, inject } from '@angular/core';

import { DevModeService } from '@core/services/dev-mode.service';
import { CheckDevModeCommand } from './check-dev-mode.command';

import { CommandInterface } from '../command.interface';

@Injectable({
  providedIn: 'root',
})
export class SwitchOnDevCommand implements CommandInterface {
  public static readonly Label = 'dev:mode:on';

  private readonly _devModeService = inject(DevModeService);
  private readonly _checkDevModeCommand = inject(CheckDevModeCommand);

  public execute(): void {
    this._devModeService.switchOn();
    this._checkDevModeCommand.execute();
  }
}
