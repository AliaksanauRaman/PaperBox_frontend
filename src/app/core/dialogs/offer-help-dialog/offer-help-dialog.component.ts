import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';

import { LocationSelectionOptionsService } from '../../services/location-selection-options.service';
import {
  ALL_LOCATIONS_WITH_TRANSLATED_LABELS,
  allLocationsWithTranslatedLabelsFactory,
} from './all-locations-with-translated-labels';
import { AppLanguagesService } from '../../services/app-languages.service';
import {
  AllLocationsType,
  ALL_LOCATIONS,
} from '../../dependencies/all-locations';

import { DataSource } from '../../../shared/classes/data-source.class';

@Component({
  selector: 'app-offer-help-dialog',
  templateUrl: './offer-help-dialog.component.html',
  styleUrls: ['./offer-help-dialog.component.scss'],
  providers: [
    {
      provide: ALL_LOCATIONS_WITH_TRANSLATED_LABELS,
      useFactory: allLocationsWithTranslatedLabelsFactory,
      deps: [AppLanguagesService, ALL_LOCATIONS],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: Refactor
export class OfferHelpDialogComponent {
  protected readonly locationsFromDataSource = DataSource.createFromLocations(
    this.allLocationsWithTranslatedLabels
  );

  protected readonly offerHelpForm = this.formBuilder.group({
    locationFrom: [''],
    locationTo: [''],
  });

  protected readonly locationsToDataSource$ =
    this.offerHelpForm.controls.locationFrom.valueChanges.pipe(
      map((locationValue) => {
        if (locationValue === null) {
          return null;
        }

        const selectedLocationFrom = this.allLocationsWithTranslatedLabels.find(
          ({ value }) => value === locationValue
        );

        if (selectedLocationFrom === undefined) {
          return null;
        }

        return DataSource.createFromLocations(
          this.allLocationsWithTranslatedLabels.filter(
            ({ country }) =>
              country.value !== selectedLocationFrom.country.value
          )
        );
      })
    );

  constructor(
    private readonly dialogRef: DialogRef<void>,
    private readonly locationSelectionOptionsService: LocationSelectionOptionsService,
    private readonly formBuilder: FormBuilder,
    @Inject(ALL_LOCATIONS_WITH_TRANSLATED_LABELS)
    private readonly allLocationsWithTranslatedLabels: AllLocationsType
  ) {
    this.offerHelpForm.valueChanges.subscribe((val) => console.log({ val }));
  }

  // TODO: Abstract class
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
