import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  computed,
  inject,
} from '@angular/core';
import { NgIf } from '@angular/common';

import { IconComponent } from '../icon/icon.component';

import {
  PATH_TO_ACTIVE_ARROW_ICON,
  PATH_TO_ARROW_ICON,
} from './place-list-item.config';
import { Place } from '@shared/types/place';

@Component({
  selector: 'app-place-list-item',
  templateUrl: './place-list-item.component.html',
  styleUrls: ['./place-list-item.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, IconComponent],
})
export class PlaceListItemComponent {
  private readonly _pathToArrowIcon = inject(PATH_TO_ARROW_ICON);
  private readonly _pathToActiveArrowIcon = inject(PATH_TO_ACTIVE_ARROW_ICON);

  @Input({ required: true })
  public set place(value: Place) {
    this._place.set(value);
  }

  @Input()
  public set isSelected(value: boolean) {
    this._isSelected.set(value);
  }

  public readonly arrowIconSrc = computed(() => this._arrowIconSrc());

  protected readonly _place = signal<Place | null>(null);
  protected readonly _isSelected = signal(false);
  protected readonly _arrowIconSrc = computed(() =>
    this._isSelected() ? this._pathToActiveArrowIcon : this._pathToArrowIcon
  );
}
