import { Observable, of, delay } from 'rxjs';

import { LoginHttpServiceInterface } from './login-http-service.interface';
import { LoginDto } from '@shared/dtos/login.dto';
import { LoginResponseData } from '@shared/types/login-response-data';

const MOCK_TOKEN = 'mockToken';
const DELAY_IN_MS = 1000;

export class LoginHttpServiceMock implements LoginHttpServiceInterface {
  public login(_loginDto: LoginDto): Observable<LoginResponseData> {
    return of(new LoginResponseData(MOCK_TOKEN)).pipe(delay(DELAY_IN_MS));
  }
}
