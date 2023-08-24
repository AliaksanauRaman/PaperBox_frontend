import { Selectable } from '@shared/utility-types/selectable.utility-type';

export const select = <T extends Record<string, unknown>>(
  item: Selectable<T>
): Selectable<T> => {
  return {
    ...item,
    isSelected: true,
  };
};
