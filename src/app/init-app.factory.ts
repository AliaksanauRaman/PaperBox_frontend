import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

import { TranslationsService } from '@core/services/translations.service';
import { UserTokenInitializerService } from './core/services/user-token-initializer.service';
import { UserTokenUpdatesListenerService } from './core/services/user-token-updates-listener.service';
import { UserUpdatesListenerService } from './core/services/user-updates-listener.service';
import { ImagesService } from './shared/services/images.service';

export const initAppFactory = (
  translationsService: TranslationsService,
  userTokenInitializerService: UserTokenInitializerService,
  userTokenUpdatesListenerService: UserTokenUpdatesListenerService,
  userUpdatesListenerService: UserUpdatesListenerService,
  imagesService: ImagesService
): (() => void) => {
  return () => {
    translationsService.setUp();
    userTokenInitializerService.initialize();
    userTokenUpdatesListenerService.setUp();
    userUpdatesListenerService.setUp();
    imagesService.loadImages();
  };
};

export const INIT_APP_FACTORY_PROVIDER: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initAppFactory,
  deps: [
    TranslationsService,
    UserTokenInitializerService,
    UserTokenUpdatesListenerService,
    UserUpdatesListenerService,
    ImagesService,
  ],
  multi: true,
};
