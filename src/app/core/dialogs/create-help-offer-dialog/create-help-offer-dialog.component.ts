import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { BehaviorSubject, tap } from 'rxjs';

import { CreateHelpOfferService } from '../../services/create-help-offer.service';

import { DialogComponent } from '../../../shared/abstracts/dialog-component.class';

import { CreateHelpOfferDto } from '../../../shared/dtos/create-help-offer.dto';

const NORMAL_TITLE = 'dialogs.offerHelp.title';
const LOADING_TITLE = 'dialogs.offerHelp.loading';
const SUCCESS_TITLE = 'dialogs.offerHelp.success';

@Component({
  selector: 'app-create-help-offer-dialog',
  templateUrl: './create-help-offer-dialog.component.html',
  styleUrls: [
    './create-help-offer-dialog.component.scss',
    '../find-and-offer-help-dialogs-common-styles.scss',
  ],
  providers: [CreateHelpOfferService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHelpOfferDialogComponent extends DialogComponent {
  @HostListener('document:keydown.enter', ['$event'])
  private handleEnterPress(event: KeyboardEvent): void {
    event.stopImmediatePropagation();

    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    if (this.offerHelpForm.invalid) {
      return;
    }

    this.createHelpOffer();
  }

  private readonly _dialogTitle$ = new BehaviorSubject<string>(NORMAL_TITLE);
  public readonly dialogTitle$ = this._dialogTitle$.asObservable();

  public readonly createHelpOfferRequestState$ =
    this.createHelpOfferRequestService.state$.pipe(
      tap((state) => {
        if (state.inProgress) {
          this._dialogTitle$.next(LOADING_TITLE);
          this.offerHelpForm.disable();
        } else if (state.error !== null) {
          this._dialogTitle$.next(NORMAL_TITLE);
          this.offerHelpForm.enable();
        } else if (state.data !== null) {
          this._dialogTitle$.next(SUCCESS_TITLE);
        }
      })
    );

  protected readonly offerHelpForm = this.formBuilder.group({
    locations: [
      {
        from: '',
        to: '',
      },
    ],
    date: [
      {
        start: null,
        end: null,
      },
    ],
    comment: [''],
    fullName: ['', [Validators.required]],
    phones: [
      [
        {
          diallingCode: '',
          number: '',
        },
      ],
    ],
  });

  constructor(
    dialogRef: DialogRef<void>,
    private readonly formBuilder: FormBuilder,
    private readonly createHelpOfferRequestService: CreateHelpOfferService
  ) {
    super(dialogRef);
  }

  public handleSendButtonClick(event: MouseEvent): void {
    if (!event.isTrusted) {
      console.log('Nice try');
      return;
    }

    this.createHelpOffer();
  }

  private createHelpOffer(): void {
    const { locations, date, comment, fullName, phones } =
      this.offerHelpForm.getRawValue();

    this.createHelpOfferRequestService.performRequest(
      new CreateHelpOfferDto(
        locations!.from,
        locations!.to,
        date!.start,
        date!.end,
        comment,
        fullName,
        phones
      )
    );
  }
}
