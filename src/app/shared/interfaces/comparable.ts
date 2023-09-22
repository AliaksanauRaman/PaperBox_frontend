export interface Comparable<T = unknown> {
  equalsTo(value: T): boolean;
}
