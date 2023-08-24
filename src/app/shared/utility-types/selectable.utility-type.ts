export type Selectable<T extends Record<string, unknown>> = T &
  Readonly<{
    isSelected: boolean;
  }>;
