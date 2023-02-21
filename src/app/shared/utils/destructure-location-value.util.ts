type DestructuredLocationValue = Readonly<{
  countryValueAsString: string;
  cityValueAsString: string;
}>;

export const destructureLocationValue = (
  locationValue: string
): DestructuredLocationValue => {
  const [countryValueAsString, cityValueAsString, ...otherParts] =
    locationValue.split(' ');

  if (isMissed(countryValueAsString)) {
    throw new Error(
      `Country value is missed in '${locationValue}' locationValue!`
    );
  }

  if (isMissed(cityValueAsString)) {
    throw new Error(
      `City value is missed in '${locationValue}' locationValue!`
    );
  }

  if (otherParts.length !== 0) {
    throw new Error(
      `locationValue '${locationValue}' is wrong! It must have only two parts.`
    );
  }

  return {
    countryValueAsString,
    cityValueAsString,
  };
};

const isMissed = (value: string | undefined): boolean => {
  return value === undefined || value === '';
};
