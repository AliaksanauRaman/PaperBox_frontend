import { AllLocationsType } from '../../../dependencies/all-locations';
import { TranslationsService } from '@core/services/translations.service';
import { AllLocationsWithTranslatedLabelsType } from './type';

export const allLocationsWithTranslatedLabelsFactory = (
  translationsService: TranslationsService,
  allLocations: AllLocationsType
): AllLocationsWithTranslatedLabelsType => {
  return allLocations.map(({ city, country, value }) => ({
    city: {
      countryValue: city.countryValue,
      value: city.value,
      label: translationsService.translateByKey(city.label),
    },
    country: {
      value: country.value,
      label: translationsService.translateByKey(country.label),
    },
    value,
  }));
};
