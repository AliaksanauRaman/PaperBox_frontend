import { UserTokenStorageService } from './core/services/user-token-storage.service';
import { UserTokenEntityService } from './shared/services/user-token-entity.service';
import { UserService } from './shared/services/user.service';
import { ImagesService } from './shared/services/images.service';

export const initAppFactory = (
  userTokenStorageService: UserTokenStorageService,
  userTokenEntityService: UserTokenEntityService,
  userService: UserService,
  imagesService: ImagesService
): (() => void) => {
  return () => {
    userTokenStorageService.setUp();
    userTokenEntityService.setUp();
    userService.setUp();
    imagesService.loadImages();
  };
};
