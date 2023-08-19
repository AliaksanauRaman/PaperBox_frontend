import { Disableable } from '@shared/utility-types/disableable.utility-type';

export const disable = <T extends Record<string, unknown>>(
  item: Disableable<T>
): Disableable<T> => {
  return {
    ...item,
    isDisabled: true,
  };
};
