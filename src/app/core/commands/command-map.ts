import { Type, InjectionToken } from '@angular/core';

import { CommandInterface } from './command.interface';
import { HelpCommand } from './entries/help.command';
import { RedirectToAdminHomeCommand } from './entries/redirect-to-admin-home.command';
import { RedirectToAdminLoginCommand } from './entries/redirect-to-admin-login.command';
import { RedirectToHomeCommand } from './entries/redirect-to-home.command';
import { LogUserCommand } from './entries/log-user.command';
import { CheckDevModeCommand } from './entries/check-dev-mode.command';
import { SwitchOffDevCommand } from './entries/switch-off-dev-mode.command';
import { SwitchOnDevCommand } from './entries/switch-on-dev-mode.command';

export const COMMAND_MAP = new InjectionToken<typeof COMMAND_MAP_VALUE>(
  'COMMAND_MAP',
  { providedIn: 'root', factory: () => COMMAND_MAP_VALUE }
);
export const COMMAND_MAP_VALUE: Record<string, Type<CommandInterface>> = {
  [HelpCommand.Label]: HelpCommand,
  [RedirectToAdminHomeCommand.Label]: RedirectToAdminHomeCommand,
  [RedirectToAdminLoginCommand.Label]: RedirectToAdminLoginCommand,
  [RedirectToHomeCommand.Label]: RedirectToHomeCommand,
  [LogUserCommand.Label]: LogUserCommand,
  [CheckDevModeCommand.Label]: CheckDevModeCommand,
  [SwitchOffDevCommand.Label]: SwitchOffDevCommand,
  [SwitchOnDevCommand.Label]: SwitchOnDevCommand,
};
