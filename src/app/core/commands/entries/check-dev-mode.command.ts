import { Injectable, inject } from '@angular/core';

import { DevModeService } from '@core/services/dev-mode.service';

import { CommandInterface } from '../command.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckDevModeCommand implements CommandInterface {
  public static readonly Label = 'check:dev:mode';

  private readonly _devModeService = inject(DevModeService);

  public execute(): void {
    alert(`Dev mode is ${this._devModeService.isOn() ? 'ON' : 'OFF'}.`);
  }
}
