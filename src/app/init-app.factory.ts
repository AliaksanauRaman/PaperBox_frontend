import { TranslationsService } from '@core/services/translations.service';
import { LocalizationsService } from '@core/services/localizations.service';
import { UserTokenInitializerService } from './core/services/user-token-initializer.service';
import { UserTokenUpdatesListenerService } from './core/services/user-token-updates-listener.service';
import { UserUpdatesListenerService } from './core/services/user-updates-listener.service';
import { ImagesService } from './shared/services/images.service';

export const initAppFactory = (
  translationsService: TranslationsService,
  appLocalizationsService: LocalizationsService,
  userTokenInitializerService: UserTokenInitializerService,
  userTokenUpdatesListenerService: UserTokenUpdatesListenerService,
  userUpdatesListenerService: UserUpdatesListenerService,
  imagesService: ImagesService
): (() => void) => {
  return () => {
    translationsService.setUp();
    appLocalizationsService.init();
    userTokenInitializerService.initialize();
    userTokenUpdatesListenerService.setUp();
    userUpdatesListenerService.setUp();
    imagesService.loadImages();
  };
};
