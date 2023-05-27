import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../shared/dependencies/api-url/injection-token';
import { AdminHeadersService } from './admin-headers.service';

import { FullUserListType } from '../types/full-user.type';
import { FullUserStatus } from '../enums/full-user-status.enum';
import { UserRole } from '../../shared/enums/user-role.enum';
import { UpdateUserResponseDataType } from '../types/update-user-response-data.type';
import { UpdateFullUserRoleDto } from '../dtos/update-full-user-role.dto';
import { UpdateFullUserStatusDto } from '../dtos/update-full-user-status.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminFullUsersHttpService {
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string,
    private readonly _httpClient: HttpClient,
    private readonly _headersService: AdminHeadersService
  ) {}

  public getAll(): Observable<FullUserListType> {
    return this._httpClient.get<FullUserListType>(
      `${this._apiUrl}/admin/users`,
      {
        headers: this._headersService.buildDefault(),
      }
    );
  }

  public updateRoleOfOne(
    userId: number,
    role: UserRole
  ): Observable<UpdateUserResponseDataType> {
    return this._httpClient
      .put<null>(
        `${this._apiUrl}/admin/users/${userId}`,
        new UpdateFullUserRoleDto(role),
        { headers: this._headersService.buildDefault(), observe: 'response' }
      )
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return {
              id: userId,
              ok: true,
            };
          }

          throw new Error('Error during user role update!');
        })
      );
  }

  public updateStatusOfOne(
    userId: number,
    status: FullUserStatus
  ): Observable<UpdateUserResponseDataType> {
    return this._httpClient
      .put<null>(
        `${this._apiUrl}/admin/users/${userId}`,
        new UpdateFullUserStatusDto(status),
        { headers: this._headersService.buildDefault(), observe: 'response' }
      )
      .pipe(
        map((response) => {
          if (response.status === HttpStatusCode.Ok) {
            return {
              id: userId,
              ok: true,
            };
          }

          throw new Error('Error during user status update!');
        })
      );
  }
}
