import { Directive, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DestroyEmitter } from '../../shared/abstracts/destroy-emitter.class';

@Directive()
export class AdminContentPageComponent extends DestroyEmitter {
  protected _loading = true;

  protected readonly _matSnackBar: MatSnackBar;

  constructor(matSnackBar?: MatSnackBar) {
    super();

    this._matSnackBar = matSnackBar || inject(MatSnackBar);
  }

  protected handleHttpRequestError(error: unknown): never {
    this._matSnackBar.open(
      'An error occurred, for more details, please, check the console.',
      'Ok',
      {
        duration: 5000,
      }
    );
    throw error;
  }
}
