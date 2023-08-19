import { Disableable } from '@shared/utility-types/disableable.utility-type';

export const enable = <T extends Record<string, unknown>>(
  item: Disableable<T>
): Disableable<T> => {
  return {
    ...item,
    isDisabled: false,
  };
};
