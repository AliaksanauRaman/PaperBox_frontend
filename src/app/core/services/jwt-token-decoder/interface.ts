import { DecodedUserToken } from '../../../shared/classes/decoded-user-token.class';

export interface JwtTokenDecoder {
  decode(token: string): DecodedUserToken;
}
