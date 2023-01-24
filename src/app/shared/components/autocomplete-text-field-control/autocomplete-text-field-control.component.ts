import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';

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
// TODO: Think about making this component "less shared"
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

  protected readonly inputControl = new FormControl('');
  protected readonly controlValue$ = new BehaviorSubject<string>('');

  protected readonly filteredOptions$ = combineLatest([
    this.controlDataSource$.asObservable(),
    this.inputControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([controlDataSource, inputValue]) => {
      if (
        !controlDataSource.options.some(({ label }) => label === inputValue)
      ) {
        const nextValue = '';

        if (this.isNewValue(nextValue)) {
          this.emitValueChange(nextValue);
        }

        this.updateControlValue(nextValue);
      }

      if (inputValue === '' || inputValue === null) {
        return controlDataSource.options;
      }

      return controlDataSource.options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    })
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

    if (value === null || value === '') {
      this.updateControlValue('');
      return;
    }

    const foundOption = this.controlDataSource$
      .getValue()
      .options.find((item) => item.value === value);

    if (foundOption === undefined) {
      throw new Error('Option with such value is not found!');
    }

    this.inputControl.setValue(foundOption.label);
    this.updateControlValue(value);
  }

  public handleOptionSelection(event: MatAutocompleteSelectedEvent): void {
    const foundOption = this.controlDataSource$
      .getValue()
      .options.find((item) => item.label === event.option.value);

    if (foundOption === undefined) {
      throw new Error('It cannot be that no option was found!');
    }

    const nextValue = foundOption.value;

    if (this.isNewValue(nextValue)) {
      this.emitValueChange(nextValue);
    }

    this.updateControlValue(nextValue);
  }

  // TODO: Move to a shared place
  private isStringOrNull(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }

  private isNewValue(value: string): boolean {
    return this.controlValue$.getValue() !== value;
  }

  private emitValueChange(value: string): void {
    this.onChange(value);
  }

  private updateControlValue(value: string): void {
    this.controlValue$.next(value);
  }
}
