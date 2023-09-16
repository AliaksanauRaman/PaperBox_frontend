import { HttpContextToken } from '@angular/common/http';

export const IS_AUTHORIZED = new HttpContextToken(() => false);
