import { UserTokenStorageService } from './core/services/user-token-storage.service';
import { UserTokenEntityService } from './shared/services/user-token-entity.service';
import { UserService } from './shared/services/user.service';

export const initAppFactory = (
  userTokenStorageService: UserTokenStorageService,
  userTokenEntityService: UserTokenEntityService,
  userService: UserService
): (() => void) => {
  return () => {
    userTokenStorageService.setUp();
    userTokenEntityService.setUp();
    userService.setUp();
  };
};
