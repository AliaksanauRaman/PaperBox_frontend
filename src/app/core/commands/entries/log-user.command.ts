import { UserService } from '../../../shared/services/user.service';

import { CommandInterface } from '../command.interface';

export class LogUserCommand implements CommandInterface {
  public static readonly Label = 'log:user';

  constructor(private readonly _userService: UserService) {}

  public execute(): void {
    alert(JSON.stringify(this._userService.getValueOrNull(), null, 2));
  }
}
