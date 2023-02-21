import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  FormGroup,
  NG_VALIDATORS,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { tap, takeUntil, merge, map, combineLatest, startWith } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';
import { AppLanguagesService } from '../../services/app-languages.service';
import { ALL_LOCATIONS } from '../../dependencies/all-locations';
import {
  ALL_LOCATIONS_WITH_TRANSLATED_LABELS,
  allLocationsWithTranslatedLabelsFactory,
  AllLocationsWithTranslatedLabelsType,
} from './all-locations-with-translated-labels';

import { CustomControl } from '../../../shared/abstracts/custom-control.class';
import { DataSource } from '../../../shared/classes/data-source.class';
import { destructureLocationValue } from '../../../shared/utils/destructure-location-value.util';

type LocationsControlValue = Readonly<{
  from: string;
  to: string;
}>;

@Component({
  selector: 'app-locations-control',
  templateUrl: './locations-control.component.html',
  styleUrls: ['./locations-control.component.scss'],
  providers: [
    {
      provide: ALL_LOCATIONS_WITH_TRANSLATED_LABELS,
      useFactory: allLocationsWithTranslatedLabelsFactory,
      deps: [AppLanguagesService, ALL_LOCATIONS],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationsControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LocationsControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsControlComponent
  extends CustomControl<LocationsControlValue>
  implements OnInit, Validator
{
  protected readonly locationsForm = new FormGroup({
    from: new FormControl<string>('', [Validators.required]),
    to: new FormControl<string>('', [Validators.required]),
  });
  protected readonly locationsDataSource = DataSource.createFromLocations(
    this.allLocationsWithTranslatedLabels
  );
  protected readonly sameCountry$ = this.locationsForm.valueChanges.pipe(
    map(({ from, to }) => {
      if (!from || !to) {
        return false;
      }

      const { countryValueAsString: fromCountry } = destructureLocationValue(from);
      const { countryValueAsString: toCountry } = destructureLocationValue(to);

      return fromCountry === toCountry;
    })
  );
  protected readonly sameCity$ = this.locationsForm.valueChanges.pipe(
    map(({ from, to }) => {
      if (!from || !to) {
        return false;
      }

      const { cityValueAsString: fromCity } = destructureLocationValue(from);
      const { cityValueAsString: toCity } = destructureLocationValue(to);

      return fromCity === toCity;
    })
  );
  protected readonly warnings$ = combineLatest([
    this.sameCountry$,
    this.sameCity$,
  ]).pipe(startWith([false, false]), map(([sameCountry, sameCity]) => ({ sameCountry, sameCity })));

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef,
    @Inject(ALL_LOCATIONS_WITH_TRANSLATED_LABELS)
    private readonly allLocationsWithTranslatedLabels: AllLocationsWithTranslatedLabelsType
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public ngOnInit(): void {
    merge(
      this.locationsForm.controls.from.valueChanges,
      this.locationsForm.controls.to.valueChanges
    )
      .pipe(
        tap(() => this.emitChangeEvent()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public writeValue(value: LocationsControlValue): void {
    // TODO: Assert value type

    this.locationsForm.setValue(value);
  }

  public validate(thisControl: AbstractControl): ValidationErrors | null {
    const thisControlValue: LocationsControlValue | null =
      thisControl.getRawValue();

    if (
      thisControlValue === null ||
      thisControlValue.from === '' ||
      thisControlValue.to === ''
    ) {
      return { invalid: true };
    }

    return null;
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  public switchLocations(): void {
    const fromValue = this.locationsForm.controls.from.getRawValue() || '';
    const toValue = this.locationsForm.controls.to.getRawValue() || '';
    this.locationsForm.setValue(
      {
        from: toValue,
        to: fromValue,
      },
      { emitEvent: false, onlySelf: true }
    );
    this.emitChangeEvent();
  }

  private emitChangeEvent(): void {
    const fromValue = this.locationsForm.controls.from.getRawValue() || '';
    const toValue = this.locationsForm.controls.to.getRawValue() || '';

    this.onChange({
      from: fromValue,
      to: toValue,
    });
    this.onValidatorChange();
  }

  private onValidatorChange = () => {};
}
