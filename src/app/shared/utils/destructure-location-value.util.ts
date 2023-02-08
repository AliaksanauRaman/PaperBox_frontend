type DestructuredLocationValue = Readonly<{
  countryValue: string;
  cityValue: string;
}>;

export const destructureLocationValue = (
  locationValue: string
): DestructuredLocationValue => {
  const [countryValue, cityValue, ...otherParts] = locationValue.split(' ');

  if (isMissed(countryValue)) {
    throw new Error(
      `countryValue is missed in '${locationValue}' locationValue!`
    );
  }

  if (isMissed(cityValue)) {
    throw new Error(`cityValue is missed in '${locationValue}' locationValue!`);
  }

  if (otherParts.length !== 0) {
    throw new Error(
      `locationValue '${locationValue}' is wrong! It must have only two parts.`
    );
  }

  return {
    countryValue,
    cityValue,
  };
};

const isMissed = (value: string | undefined): boolean => {
  return value === undefined || value === '';
};
