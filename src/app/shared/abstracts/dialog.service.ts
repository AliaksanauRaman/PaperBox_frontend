import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

@Injectable()
export abstract class DialogService {
  constructor(protected readonly _dialog: Dialog) {}
}
