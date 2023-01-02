import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appHttpErrorMessage',
})
export class HttpErrorMessagePipe implements PipeTransform {
  public transform(value: HttpErrorResponse): string {
    if (value.error && value.error.message) {
      return value.error.message;
    }

    return value.message;
  }
}
