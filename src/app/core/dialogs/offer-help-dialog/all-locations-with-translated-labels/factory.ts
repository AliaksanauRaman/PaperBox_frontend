import { AllLocationsType } from '../../../dependencies/all-locations';
import { AppLanguagesService } from '../../../services/app-languages.service';
import { AllLocationsWithTranslatedLabelsType } from './type';

export const allLocationsWithTranslatedLabelsFactory = (
  appLanguagesService: AppLanguagesService,
  allLocations: AllLocationsType
): AllLocationsWithTranslatedLabelsType => {
  return allLocations.map(({ city, country, value }) => ({
    city: {
      countryValue: city.countryValue,
      value: city.value,
      label: appLanguagesService.translateByKey(city.label),
    },
    country: {
      value: country.value,
      label: appLanguagesService.translateByKey(country.label),
    },
    value,
  }));
};
