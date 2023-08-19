import { Disableable } from '@shared/utility-types/disableable.utility-type';

export const toDisableable = <T extends Record<string, unknown>>(
  item: T
): Disableable<T> => {
  return {
    ...item,
    isDisabled: false,
  };
};
