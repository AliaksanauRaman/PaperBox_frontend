import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';

import { HelpOffersHttpService } from './../../services/help-offers-http.service';
import { TypesAssertionService } from '../../services/types-assertion.service';

import { newHelpOfferValidFormValueSchema } from '../../shared/types/new-help-offer-valid-form-value.type';
import { HelpOfferFactory } from './../../shared/factories/help-offer.factory';
import { DateType } from './../../shared/enums/date-type.enum';

@Component({
  selector: 'app-new-help-offer-dialog',
  templateUrl: './new-help-offer-dialog.component.html',
  styleUrls: ['./new-help-offer-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewHelpOfferDialogComponent {
  protected readonly newHelpOfferForm = this.formBuilder.group({
    authorFullName: ['Раман Аляксанаў', Validators.required],

    dateType: [DateType.SPECIFIC],
    specificDateAsString: ['2022-12-22'],
    dateFromAsString: ['2022-12-22'],
    dateToAsString: ['2022-12-30'],

    countryFrom: ['Польшча'],
    cityFrom: ['Кракаў'],

    countryTo: ['Беларусь'],
    cityTo: ['Мінск'],

    phones: this.formBuilder.array([
      this.formBuilder.group({
        diallingCode: ['+48'],
        number: ['696726764'],
      }),
    ]),

    comment: ['Круты каментар!!!'],
  });

  public readonly dateType$ = this.newHelpOfferForm.valueChanges.pipe(
    startWith({ dateType: DateType.SPECIFIC }),
    map((formValue) => {
      const dateType = formValue.dateType;

      if (dateType !== DateType.SPECIFIC && dateType !== DateType.RANGE) {
        throw new Error('Date type is wrong!');
      }

      return dateType;
    }),
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly helpOffersHttpService: HelpOffersHttpService,
    private readonly typesAssertionService: TypesAssertionService,
  ) {}

  public handleCreateButtonClick(): void {
    const value = this.newHelpOfferForm.getRawValue();

    // TODO: Temp
    if (this.typesAssertionService.valueFollowsSchema(value, newHelpOfferValidFormValueSchema)) {
      console.log('%c SUCCESS', 'color: green; font-size: 30px;');

      const factory = new HelpOfferFactory(value);
      this.helpOffersHttpService.createOneUnpublished(factory.buildCreateDto())
        .subscribe(result => console.log(result));
    } else {
      console.log('%c ERROR', 'color: red; font-size: 30px;');
    }
  }

  protected switchToSpecificDate(): void {
    this.newHelpOfferForm.patchValue({ dateType: DateType.SPECIFIC });
  }

  protected switchToDateRange(): void {
    this.newHelpOfferForm.patchValue({ dateType: DateType.RANGE });
  }
}
