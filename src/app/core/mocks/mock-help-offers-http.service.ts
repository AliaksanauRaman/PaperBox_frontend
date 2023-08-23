import { Observable, of, delay, tap } from 'rxjs';

import { HelpOffersHttpServiceInterface } from '../interfaces/help-offers-http-service.interface';
import {
  ListOfPublishedApplicationEntities,
  PublishedApplicationEntity,
} from '@shared/entities/published-application.entity';
import { CreateHelpOfferDto } from '@shared/dtos/create-help-offer.dto';
import { DeleteHelpOfferResponseDataType } from '@shared/types/delete-help-offer-response-data.type';

const DELAY_IN_MS = 1000;

export class MockHelpOffersHttpService
  implements HelpOffersHttpServiceInterface
{
  public getPublished(): Observable<ListOfPublishedApplicationEntities> {
    return of(MOCK_LIST_OF_PUBLISHED_HELP_OFFERS).pipe(delay(DELAY_IN_MS));
  }

  public getPublishedError(): Observable<ListOfPublishedApplicationEntities> {
    return of(MOCK_LIST_OF_PUBLISHED_HELP_OFFERS).pipe(
      tap(() => {
        throw new Error('Get published help offers error!');
      })
    );
  }

  public createOne(
    _createHelpOfferDto: CreateHelpOfferDto
  ): Observable<PublishedApplicationEntity> {
    return of(MOCK_PUBLISHED_HELP_OFFER).pipe(delay(DELAY_IN_MS));
  }

  public deleteOne(
    helpOfferId: number
  ): Observable<DeleteHelpOfferResponseDataType> {
    return of({ id: helpOfferId, deleted: true as const }).pipe(
      delay(DELAY_IN_MS)
    );
  }
}

const MOCK_PUBLISHED_HELP_OFFER = {
  id: 1,
  userId: 6,
  publicId: '123',
  locationFrom: '1 10002',
  locationTo: '2 20003',
  comment:
    'Looking for a rideLooking for a rideLooking for a rideLooking for a rideLooking for a rideLooking for a rideLooking for a rideLooking for a rideLooking for a ride',
  fullName: 'John Smith',
  phones: [
    { diallingCode: '+48', number: '555555555' },
    { diallingCode: '+48', number: '555555555' },
    { diallingCode: '+48', number: '555555555' },
  ],
  startDate: new Date('2022-01-01'),
  endDate: null,
};
const MOCK_LIST_OF_PUBLISHED_HELP_OFFERS: ListOfPublishedApplicationEntities = [
  MOCK_PUBLISHED_HELP_OFFER,
  {
    id: 2,
    userId: 1,
    publicId: '234',
    locationFrom: '1 10003',
    locationTo: '2 20004',
    comment: 'Test comments section...',
    fullName: 'Volga Daniluk',
    phones: [{ diallingCode: '+48', number: '696888222' }],
    startDate: new Date('2022-02-02'),
    endDate: null,
  },
  {
    id: 3,
    userId: 6,
    publicId: '345',
    locationFrom: '1 10004',
    locationTo: '2 20005',
    comment: '',
    fullName: 'Test User',
    phones: [{ diallingCode: '+48', number: '111222333' }],
    startDate: new Date('2022-03-03'),
    endDate: null,
  },
  {
    id: 4,
    userId: 2,
    publicId: '345',
    locationFrom: '1 10004',
    locationTo: '2 20005',
    comment: 'Yo!',
    fullName: 'Jesse Pinkman',
    phones: [{ diallingCode: '+48', number: '111222333' }],
    startDate: new Date('2022-03-03'),
    endDate: new Date('2023-03-03'),
  },
  {
    id: 5,
    userId: 6,
    publicId: '345',
    locationFrom: '1 10004',
    locationTo: '2 20005',
    comment: 'Nothing... just testing',
    fullName: 'Raman Aliaksanau',
    phones: [{ diallingCode: '+48', number: '111222333' }],
    startDate: new Date('2022-03-03'),
    endDate: null,
  },
  {
    id: 6,
    userId: 3,
    publicId: '345',
    locationFrom: '1 10004',
    locationTo: '2 20005',
    comment: 'Nothing... just testing',
    fullName: 'Raman Aliaksanau',
    phones: [{ diallingCode: '+48', number: '111222333' }],
    startDate: new Date('2022-03-03'),
    endDate: null,
  },
];
