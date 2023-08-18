import { Observable, of, delay } from 'rxjs';

import { HelpRequestsHttpServiceInterface } from '../interfaces/help-requests-http-service.interface';
import { ListOfPublishedHelpRequestsType } from '../../shared/types/list-of-published-help-requests.type';
import { CreateHelpRequestDto } from '../../shared/dtos/create-help-request.dto';
import { SuccessCreateHelpRequestResponseDataType } from '../../shared/types/success-create-help-request-response-data.type';
import { DeleteHelpRequestResponseDataType } from '../../shared/types/delete-help-request-response-data.type';

const DELAY_IN_MS = 1000;

export class MockHelpRequestsHttpService
  implements HelpRequestsHttpServiceInterface
{
  public getPublished(): Observable<ListOfPublishedHelpRequestsType> {
    return of(MOCK_PUBLISHED_HELP_REQUESTS).pipe(delay(DELAY_IN_MS));
  }

  public createOne(
    _createHelpRequestDto: CreateHelpRequestDto
  ): Observable<SuccessCreateHelpRequestResponseDataType> {
    return of({ publicId: '555-666-777' }).pipe(delay(DELAY_IN_MS));
  }

  public deleteOne(
    helpRequestId: number
  ): Observable<DeleteHelpRequestResponseDataType> {
    return of({ id: helpRequestId, deleted: true as const }).pipe(
      delay(DELAY_IN_MS)
    );
  }
}

const MOCK_PUBLISHED_HELP_REQUESTS: ListOfPublishedHelpRequestsType = [
  {
    id: 1,
    userId: 1,
    publicId: '111',
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
    startDate: new Date('2023-11-18'),
    endDate: null,
  },
  {
    id: 2,
    userId: 2,
    publicId: '222',
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
    startDate: new Date('2023-07-12'),
    endDate: null,
  },
  {
    id: 3,
    userId: 3,
    publicId: '333',
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
    startDate: new Date('2023-02-09'),
    endDate: new Date('2023-02-23'),
  },
  {
    id: 4,
    userId: 4,
    publicId: '444',
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
    startDate: new Date('2023-02-09'),
    endDate: new Date('2023-02-23'),
  },
  {
    id: 5,
    userId: 5,
    publicId: '555',
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
    startDate: new Date('2023-11-18'),
    endDate: null,
  },
  {
    id: 6,
    userId: 6,
    publicId: '666',
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
    startDate: new Date('2023-07-12'),
    endDate: null,
  },
  {
    id: 7,
    userId: 7,
    publicId: '777',
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
    startDate: new Date('2023-02-09'),
    endDate: new Date('2023-02-23'),
  },
  {
    id: 8,
    userId: 8,
    publicId: '888',
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
    startDate: new Date('2023-02-09'),
    endDate: new Date('2023-02-23'),
  },
];
