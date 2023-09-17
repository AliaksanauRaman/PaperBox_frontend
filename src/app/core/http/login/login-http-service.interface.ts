import { Observable } from 'rxjs';

import { LoginDto } from '@shared/dtos/login.dto';
import { LoginResponseData } from '@shared/types/login-response-data';

export interface LoginHttpServiceInterface {
  login(loginDto: LoginDto): Observable<LoginResponseData>;
}
