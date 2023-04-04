import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FullHelpRequestType } from '../../types/full-help-request.type';
import { FullHelpRequestStatus } from '../../enums/full-help-request-status.enum';

enum Column {
  FULL_NAME = 'fullName',
  STATUS = 'status',
}

@Component({
  selector: 'app-admin-help-requests-page',
  templateUrl: './admin-help-requests-page.component.html',
  styleUrls: [
    './admin-help-requests-page.component.scss',
    '../../styles/_admin-page-common.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
// TODO: FINISH THIS
export class AdminHelpRequestsPageComponent {
  labelsMap: Record<Column, string> = {
    fullName: 'Full name',
    status: 'Status',
  };

  dataSource = ELEMENT_DATA;
  columnsToDisplay: Array<Column> = [Column.FULL_NAME, Column.STATUS];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null = null;
}

const ELEMENT_DATA: any[] = [
  {
    fullName: 'Hydrogen',
    status: FullHelpRequestStatus.PUBLISHED,
    comment: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    fullName: 'Helium',
    status: FullHelpRequestStatus.UNPUBLISHED,
    comment: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    fullName: 'Lithium',
    status: FullHelpRequestStatus.REJECTED,
    comment: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    fullName: 'Beryllium',
    status: FullHelpRequestStatus.PUBLISHED,
    comment: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    fullName: 'Boron',
    status: FullHelpRequestStatus.UNPUBLISHED,
    comment: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    fullName: 'Carbon',
    status: FullHelpRequestStatus.REJECTED,
    comment: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    fullName: 'Nitrogen',
    status: FullHelpRequestStatus.PUBLISHED,
    comment: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    fullName: 'Oxygen',
    status: FullHelpRequestStatus.UNPUBLISHED,
    comment: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    fullName: 'Fluorine',
    status: FullHelpRequestStatus.REJECTED,
    comment: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    fullName: 'Neon',
    status: FullHelpRequestStatus.PUBLISHED,
    comment: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];
