import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { DevModeService } from '@core/services/dev-mode.service';

import { LoginHttpServiceInterface } from './login-http-service.interface';
import { LoginHttpServiceMock } from './login-http-service.mock';
import { HttpService } from '@shared/abstracts/http-service.class';
import { LoginDto } from '@shared/dtos/login.dto';
import { LoginResponseData } from '@shared/types/login-response-data';

@Injectable({
  providedIn: 'root',
  useFactory: loginHttpServiceFactory,
  deps: [DevModeService],
})
export class LoginHttpService
  extends HttpService
  implements LoginHttpServiceInterface
{
  public login(loginDto: LoginDto): Observable<LoginResponseData> {
    return this._httpClient
      .post<unknown>(`${this._apiUrl}/api/login`, loginDto.toObject())
      .pipe(
        map((loginResponseDataObject) =>
          LoginResponseData.fromObject(loginResponseDataObject)
        )
      );
  }
}

function loginHttpServiceFactory(devModeService: DevModeService) {
  if (devModeService.isOn()) {
    return new LoginHttpServiceMock();
  }

  return new LoginHttpService();
}
