import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-http-error-response-card',
  templateUrl: './http-error-response-card.component.html',
  styleUrls: ['./http-error-response-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpErrorResponseCardComponent {
  @Input()
  set httpErrorResponse(value: unknown) {
    if (!(value instanceof HttpErrorResponse)) {
      throw new Error('Only instances of HttpErrorResponse are allowed!');
    }

    this._httpErrorResponse = value;
  }

  protected _httpErrorResponse?: HttpErrorResponse;
}
