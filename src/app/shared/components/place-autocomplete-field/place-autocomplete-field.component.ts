import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  inject,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor, NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  CdkListboxModule,
  ListboxValueChangeEvent,
} from '@angular/cdk/listbox';

import { PlaceAutocompleteFieldStateService } from './place-autocomplete-field-state.service';

import { LabelDirective } from '@shared/directives/label.directive';

import { BaseDropdownField } from '@shared/base/base-dropdown-field.directive';
import { Place } from '@shared/types/place';
import { PlaceLabelPipe } from './place-label.pipe';

@Component({
  selector: 'pu-place-autocomplete-field',
  templateUrl: './place-autocomplete-field.component.html',
  styleUrls: ['./place-autocomplete-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlaceAutocompleteFieldComponent),
      multi: true,
    },
    PlaceAutocompleteFieldStateService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, OverlayModule, CdkListboxModule, PlaceLabelPipe],
  hostDirectives: [
    {
      directive: LabelDirective,
      inputs: ['label'],
    },
  ],
})
export class PlaceAutocompleteFieldComponent extends BaseDropdownField<Place | null> {
  @Input({ required: true })
  public set places(value: ReadonlyArray<Place>) {
    this._stateService.handlePlacesSet(value);
  }

  protected readonly _labelDirective = inject(LabelDirective);
  protected readonly _stateService = inject(PlaceAutocompleteFieldStateService);
  protected readonly _state = toSignal(this._stateService.state$);
  protected readonly _stateWatcher = effect(() => {
    const currentState = this._state();

    if (currentState === undefined) {
      throw new Error('Current state must be defined!');
    }

    const { selectedPlace } = currentState;

    if (!this.checkIsNewValue(selectedPlace)) {
      return;
    }

    this.setFieldValue(selectedPlace);

    if (this._stateService.checkIsEmit(currentState.type)) {
      this.onChange(selectedPlace);
    }
  });

  public override writeValue(value: unknown): void {
    if (value !== null && !Place.is(value)) {
      throw new Error('A null or Place is expected!');
    }

    if (value === null) {
      this._stateService.handleWriteNull(value);
    } else {
      this._stateService.handleWritePlace(value);
    }
  }

  protected override getDefaultValue(): Place | null {
    return null;
  }

  protected handleListboxValueChange(
    event: ListboxValueChangeEvent<unknown>
  ): void {
    const selectedPlace = event.value[0];

    if (!Place.is(selectedPlace)) {
      throw new Error('A Place is expected!');
    }

    this._stateService.handlePlaceSelection(selectedPlace);
    this.closePanel();
  }

  protected trackByPlace(_index: number, place: Place): number {
    return place.getId();
  }

  private checkIsNewValue(value: Place | null): boolean {
    const currentValue = this.getFieldValue();

    if (currentValue === null && value === null) {
      return false;
    }

    if (currentValue !== null && value !== null) {
      return !currentValue.equalsTo(value);
    }

    return true;
  }
}
