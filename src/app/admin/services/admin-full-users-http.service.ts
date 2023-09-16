import { Injectable, inject } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { AdminHeadersService } from './admin-headers.service';

import { HttpService } from '@shared/abstracts/http-service.class';
import { FullUserListType } from '../types/full-user.type';
import { FullUserStatus } from '../enums/full-user-status.enum';
import { UserRole } from '../../shared/enums/user-role.enum';
import { UpdateUserResponseDataType } from '../types/update-user-response-data.type';
import { UpdateFullUserRoleDto } from '../dtos/update-full-user-role.dto';
import { UpdateFullUserStatusDto } from '../dtos/update-full-user-status.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminFullUsersHttpService extends HttpService {
  private readonly _headersService = inject(AdminHeadersService);

  public getAll(): Observable<FullUserListType> {
    return this._httpClient.get<FullUserListType>(
      `${this._apiUrl}/admin/users`,
      {
        headers: this._headersService.buildDefault(),
        context: this.getAuthorizedContext(),
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
        {
          headers: this._headersService.buildDefault(),
          observe: 'response',
          context: this.getAuthorizedContext(),
        }
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
        {
          headers: this._headersService.buildDefault(),
          observe: 'response',
          context: this.getAuthorizedContext(),
        }
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
