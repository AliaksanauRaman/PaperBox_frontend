import { Selectable } from '@shared/utility-types/selectable.utility-type';

export const deselect = <T extends Record<string, unknown>>(
  item: Selectable<T>
): Selectable<T> => {
  return {
    ...item,
    isSelected: false,
  };
};
