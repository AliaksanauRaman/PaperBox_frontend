import jwt_decode from 'jwt-decode';

import { JwtTokenDecoder } from './interface';
import { DecodedUserToken } from '../../../shared/classes/decoded-user-token.class';
import { DecodedUserTokenType } from '../../../shared/types/decoded-user-token.type';

export class JwtDecodeImplementation implements JwtTokenDecoder {
  public decode(token: string): DecodedUserToken {
    return new DecodedUserToken(jwt_decode<DecodedUserTokenType>(token));
  }
}
