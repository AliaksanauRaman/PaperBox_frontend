import { UserTokenInitializerService } from './core/services/user-token-initializer.service';
import { UserTokenUpdatesListenerService } from './core/services/user-token-updates-listener.service';
import { UserUpdatesListenerService } from './core/services/user-updates-listener.service';
import { ImagesService } from './shared/services/images.service';

export const initAppFactory = (
  userTokenInitializerService: UserTokenInitializerService,
  userTokenUpdatesListenerService: UserTokenUpdatesListenerService,
  userUpdatesListenerService: UserUpdatesListenerService,
  imagesService: ImagesService
): (() => void) => {
  return () => {
    userTokenInitializerService.initialize();
    userTokenUpdatesListenerService.setUp();
    userUpdatesListenerService.setUp();
    imagesService.loadImages();
  };
};
