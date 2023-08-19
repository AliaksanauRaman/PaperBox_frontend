export type Disableable<T extends Record<string, unknown>> = T &
  Readonly<{
    isDisabled: boolean;
  }>;
