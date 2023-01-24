import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DataSource } from '../../classes/data-source.class';
import { DataSourceOption } from '../../classes/data-source-option.class';

@Component({
  selector: 'app-dropdown-control',
  templateUrl: './dropdown-control.component.html',
  styleUrls: ['./dropdown-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: Probably it is better to make it not reusable
export class DropdownControlComponent extends CustomControl<string> {
  @Input()
  public set dataSource(value: DataSource<string>) {
    this.controlDataSource = value;
  }

  @Input()
  public set placeholder(value: string) {
    this.controlPlaceholder = value;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public get controlValue(): string {
    return this._controlValue;
  }

  protected controlDataSource = DataSource.createEmpty<string>();
  protected controlPlaceholder = '';

  private _isOpen = false;
  private _controlValue = '';

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public writeValue(value: string | null): void {
    // TODO: Assert value type

    if (value === '' || value === null) {
      this._controlValue = '';
      return;
    }

    const optionsValues = this.controlDataSource.getOptionsValues();

    if (!optionsValues.includes(value)) {
      throw new Error(`Data source does not have '${value}' value!`);
    }

    this._controlValue = value;
  }

  protected toggleIsOpenState(): void {
    this._isOpen = !this._isOpen;
  }

  protected handleOptionClick(option: DataSourceOption<string>): void {
    if (this._controlValue !== option.value) {
      this._controlValue = option.value;
      this.onChange(this._controlValue);
    }

    this._isOpen = false;
  }
}
