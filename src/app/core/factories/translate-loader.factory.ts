import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const translateLoaderFactory = (httpBackend: HttpBackend) => {
  return new TranslateHttpLoader(new HttpClient(httpBackend));
};
