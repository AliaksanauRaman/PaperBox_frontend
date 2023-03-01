import { Observable, of, delay } from 'rxjs';

import { HelpRequestsHttpServiceInterface } from '../interfaces/help-requests-http-service.interface';
import { PublishedHelpRequestListType } from '../../shared/types/published-help-request-list.type';

const DELAY_IN_MS = 1000;

export class MockHelpRequestsHttpService
  implements HelpRequestsHttpServiceInterface
{
  public getPublished(): Observable<PublishedHelpRequestListType> {
    return of(MOCK_PUBLISHED_HELP_REQUESTS).pipe(delay(DELAY_IN_MS));
  }
}

const MOCK_PUBLISHED_HELP_REQUESTS: PublishedHelpRequestListType = [
  {
    id: '63e6428f231a9068c59334bd',
    publicId: '1',
    locationFrom: '1 10000',
    locationTo: '2 20000',
    comment: 'Возьму маленький пакетик',
    fullName: 'Владислав',
    phones: [
      {
        diallingCode: '+48',
        number: '667577900',
      },
    ],
    startDate: '18.11.2023',
    endDate: null,
  },
  {
    id: '63e6428f231a9068c59334bd',
    publicId: '1',
    locationFrom: '1 10003',
    locationTo: '2 20003',
    comment: '',
    fullName: 'Test User',
    phones: [
      {
        diallingCode: '+48',
        number: '111222333',
      },
    ],
    startDate: '12.07.2023',
    endDate: null,
  },
  {
    id: '63e643150c57614547e5a9fe',
    publicId: '2',
    locationFrom: '1 10001',
    locationTo: '3 30002',
    comment: '123comment123',
    fullName: 'Raman Aliaksanau',
    phones: [
      {
        diallingCode: '+48',
        number: '123321123',
      },
    ],
    startDate: '09.02.2023',
    endDate: '23.02.2023',
  },
  {
    id: '63e6435a0c57614547e5a9ff',
    publicId: '3',
    locationFrom: '3 30002',
    locationTo: '1 10001',
    comment: 'Test kek',
    fullName: 'Raman Aliaksanauuuu',
    phones: [
      {
        diallingCode: '+995',
        number: '123321123',
      },
    ],
    startDate: '09.02.2023',
    endDate: '23.02.2023',
  },
  {
    id: '63e6428f231a9068c59334bd',
    publicId: '1',
    locationFrom: '1 10000',
    locationTo: '2 20000',
    comment: 'Возьму маленький пакетик',
    fullName: 'Владислав',
    phones: [
      {
        diallingCode: '+48',
        number: '667577900',
      },
    ],
    startDate: '18.11.2023',
    endDate: null,
  },
  {
    id: '63e6428f231a9068c59334bd',
    publicId: '1',
    locationFrom: '1 10003',
    locationTo: '2 20003',
    comment: '',
    fullName: 'Test User',
    phones: [
      {
        diallingCode: '+48',
        number: '111222333',
      },
    ],
    startDate: '12.07.2023',
    endDate: null,
  },
  {
    id: '63e643150c57614547e5a9fe',
    publicId: '2',
    locationFrom: '1 10001',
    locationTo: '3 30002',
    comment: '123comment123',
    fullName: 'Raman Aliaksanau',
    phones: [
      {
        diallingCode: '+48',
        number: '123321123',
      },
    ],
    startDate: '09.02.2023',
    endDate: '23.02.2023',
  },
  {
    id: '63e6435a0c57614547e5a9ff',
    publicId: '3',
    locationFrom: '3 30002',
    locationTo: '1 10001',
    comment: 'Test kek',
    fullName: 'Raman Aliaksanauuuu',
    phones: [
      {
        diallingCode: '+995',
        number: '123321123',
      },
    ],
    startDate: '09.02.2023',
    endDate: '23.02.2023',
  },
];
