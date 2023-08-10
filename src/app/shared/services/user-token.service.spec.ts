import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

import { UserTokenService } from './user-token.service';

describe('UserTokenService', () => {
  let service: UserTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTokenService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(UserTokenService);
  });

  describe('value$ field', () => {
    it('should emit null by default', () => {
      service.value$
        .pipe(take(1))
        .subscribe((value) => expect(value).toBeNull());
    });

    it('should emit the corresponding value after set', () => {
      const userToken = 'userToken';

      service.set(userToken);

      service.value$
        .pipe(take(1))
        .subscribe((value) => expect(value).toBe(userToken));
    });

    it('should emit null value after remove', () => {
      const userToken = 'userToken';

      service.set(userToken);
      service.remove();

      service.value$
        .pipe(take(1))
        .subscribe((value) => expect(value).toBeNull());
    });
  });
});
