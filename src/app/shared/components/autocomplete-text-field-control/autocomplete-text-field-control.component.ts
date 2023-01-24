import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
  tap,
} from 'rxjs';

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
export class AutocompleteTextFieldControlComponent
  extends CustomControl<string>
  implements OnInit
{
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
      this.controlValue$.next('');

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

  public ngOnInit(): void {
    this.controlValue$
      .pipe(
        distinctUntilChanged(),
        tap((value) => this.onChange(value)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public writeValue(value: unknown): void {
    if (!this.isStringOrNull(value)) {
      throw new Error('Only strings and null are allowed!');
    }

    if (value === null || value === '') {
      this.controlValue$.next('');
      return;
    }

    const foundOption = this.controlDataSource$
      .getValue()
      .options.find((item) => item.value === value);

    if (foundOption === undefined) {
      throw new Error('Option with such value is not found!');
    }

    this.inputControl.setValue(foundOption.label);
    this.controlValue$.next(value);
  }

  public handleOptionSelection(event: MatAutocompleteSelectedEvent): void {
    const foundOption = this.controlDataSource$
      .getValue()
      .options.find((item) => item.label === event.option.value);

    if (foundOption === undefined) {
      throw new Error('It cannot be that no option was found!');
    }

    this.controlValue$.next(foundOption.value);
  }

  // TODO: Move to a shared place
  private isStringOrNull(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }
}
