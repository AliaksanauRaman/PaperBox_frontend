import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(protected readonly _userService: UserService) {}
}
