import { TestBed } from '@angular/core/testing';

import { CRYPTO, IdGeneratorService } from './id-generator.service';

class CryptoMock implements Pick<Crypto, 'randomUUID'> {
  public randomUUID(): `${string}-${string}-${string}-${string}-${string}` {
    return '1-2-3-4-5';
  }
}

describe('IdGeneratorService', () => {
  let service: IdGeneratorService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        IdGeneratorService,
        {
          provide: CRYPTO,
          useClass: CryptoMock,
        },
      ],
    })
  );

  beforeEach(() => {
    service = TestBed.inject(IdGeneratorService);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('should generate a UUID', () => {
    const uuid = service.generateUUID();

    expect(uuid).toBe('1-2-3-4-5');
  });
});
