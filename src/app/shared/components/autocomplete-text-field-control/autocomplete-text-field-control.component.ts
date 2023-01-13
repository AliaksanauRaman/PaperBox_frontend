import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DataSource } from '../../classes/data-source.class';

@Component({
  selector: 'app-autocomplete-text-field-control',
  templateUrl: './autocomplete-text-field-control.component.html',
  styleUrls: ['./autocomplete-text-field-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteTextFieldControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteTextFieldControlComponent extends CustomControl<string> {
  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  @Input()
  public set dataSource(value: DataSource<string>) {
    this.controlDataSource$.next(value);
  }

  private readonly controlDataSource$ = new BehaviorSubject<DataSource<string>>(
    new DataSource<string>([])
  );
  private readonly controlValue$ = new BehaviorSubject<string>('');

  protected readonly filteredOptions$ = combineLatest([
    this.controlDataSource$.asObservable(),
    this.controlValue$.asObservable(),
  ]).pipe(
    map(([controlDataSource, controlValue]) =>
      controlDataSource.options.filter((option) =>
        option.label.toLowerCase().includes(controlValue.toLowerCase())
      )
    )
  );

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public writeValue(value: unknown): void {
    if (!this.isStringOrNull(value)) {
      throw new Error('Only strings and null are allowed!');
    }

    // TODO
    // this.controlValue = value === null ? '' : value;
    this.cdRef.markForCheck();
  }

  public handleControlValueChange(newValue: string): void {
    // TODO
    this.controlValue$.next(newValue);
    // this.controlValue = newValue;
    // this.onChange(this.controlValue);
  }

  public handleOptionSelection(event: MatAutocompleteSelectedEvent): void {
    const foundOptions = this.controlDataSource$
      .getValue()
      .options.filter((item) => item.label === event.option.value);

    if (foundOptions.length === 0) {
      throw new Error('It cannot be that no option was found!');
    }

    if (foundOptions.length > 1) {
      throw new Error('Several options has equal labels!');
    }

    this.onChange(foundOptions[0].value);
  }

  // TODO: Move to a shared place
  private isStringOrNull(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }
}
