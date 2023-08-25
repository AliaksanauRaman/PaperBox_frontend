export type ReadableStorage = Pick<Storage, 'getItem'>;

export class MockStorage implements ReadableStorage {
  constructor(private readonly _storage: Record<string, string>) {}

  public getItem(key: string): string | null {
    const item = this._storage[key];

    if (item === undefined) {
      return null;
    }

    return item;
  }
}
