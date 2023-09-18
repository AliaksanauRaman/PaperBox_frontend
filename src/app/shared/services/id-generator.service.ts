import { Injectable, InjectionToken, inject } from '@angular/core';

// TODO: Move to a separate file
export const CRYPTO = new InjectionToken<Pick<Crypto, 'randomUUID'>>('CRYPTO', {
  providedIn: 'root',
  factory: () => crypto,
});

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  private readonly _crypto = inject(CRYPTO);

  public generateUUID(): string {
    return this._crypto.randomUUID();
  }
}
