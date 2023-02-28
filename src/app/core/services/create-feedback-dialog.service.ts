import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { TypeAssertionService } from './type-assertion.service';
import { ValueAssertionService } from './value-assertion.service';

import { CreateFeedbackDialogComponent } from '../dialogs/create-feedback-dialog/create-feedback-dialog.component';
import {
  CreateFeedbackFormValueType,
  ValidCreateFeedbackFormValueType,
} from '../../shared/types/create-feedback-form-value.type';

@Injectable({
  providedIn: 'root',
})
export class CreateFeedbackDialogService {
  constructor(
    private readonly dialog: Dialog,
    private readonly typeAssertionService: TypeAssertionService,
    private readonly valueAssertionService: ValueAssertionService
  ) {}

  public openDialog(): void {
    this.dialog.open(CreateFeedbackDialogComponent, {
      // TODO: Move to constants
      panelClass: 'app-custom-dialog',
    });
  }

  public isFormValueValid(
    formValue: CreateFeedbackFormValueType
  ): formValue is ValidCreateFeedbackFormValueType {
    const { fullName, email, comment } = formValue;

    return (
      this.typeAssertionService.isDefined(fullName) &&
      this.valueAssertionService.isNonEmptyString(fullName) &&
      this.typeAssertionService.isDefined(email) &&
      this.valueAssertionService.isEmailString(email) &&
      this.typeAssertionService.isDefined(comment) &&
      // TODO: Think about constants (e.g. MIN_COMMENT_LENGTH)
      this.valueAssertionService.doesStringLengthEqualOrMoreThan(comment, 10)
    );
  }
}
