import { isEmptyString } from '@shared/type-assertions/is-empty-string.type-assertion';
import { isUndefined } from '@shared/type-assertions/is-undefined.type-assertion';

type DestructuredLocationValue = Readonly<{
  countryValueAsString: string;
  cityValueAsString: string;
}>;

export const destructureLocationValue = (
  locationValue: string,
  separator = ' '
): DestructuredLocationValue => {
  const [country, city, ...otherParts] = locationValue.split(separator);

  if (isEmptyString(country)) {
    throw new Error(
      `Country value is missed in '${locationValue}' locationValue!`
    );
  }

  if (isEmptyString(city) || isUndefined(city)) {
    throw new Error(
      `City value is missed in '${locationValue}' locationValue!`
    );
  }

  if (otherParts.length !== 0) {
    throw new Error(
      `Provided locationValue '${locationValue}' is invalid! It must have only two parts.`
    );
  }

  return {
    countryValueAsString: country,
    cityValueAsString: city,
  };
};
