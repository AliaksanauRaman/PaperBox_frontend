import { Observable, of, delay } from 'rxjs';

import { HelpOffersHttpServiceInterface } from '../interfaces/help-offers-http-service.interface';
import { SuccessCreateHelpOfferResponseDataType } from '../../shared/types/success-create-help-offer-response-data.type';
import { CreateHelpOfferDto } from '../../shared/dtos/create-help-offer.dto';
import { PublishedHelpOfferListType } from '../../shared/types/published-help-offer-list.type';

const DELAY_IN_MS = 1000;

export class MockHelpOffersHttpService
  implements HelpOffersHttpServiceInterface
{
  public getPublished(): Observable<PublishedHelpOfferListType> {
    return of(MOCK_PUBLISHED_HELP_OFFERS).pipe(delay(DELAY_IN_MS));
  }

  public createOne(
    _createHelpOfferDto: CreateHelpOfferDto
  ): Observable<SuccessCreateHelpOfferResponseDataType> {
    return of({ publicId: '111-222-333' }).pipe(delay(DELAY_IN_MS));
  }
}

const MOCK_PUBLISHED_HELP_OFFERS: PublishedHelpOfferListType = [
  {
    id: '1',
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
    startDate: '2022-01-01',
    endDate: null,
  },
  {
    id: '2',
    publicId: '234',
    locationFrom: '1 10003',
    locationTo: '2 20004',
    comment: 'Test comments section...',
    fullName: 'Volga Daniluk',
    phones: [{ diallingCode: '+48', number: '696888222' }],
    startDate: '2022-02-02',
    endDate: null,
  },
  {
    id: '3',
    publicId: '345',
    locationFrom: '1 10004',
    locationTo: '2 20005',
    comment: '',
    fullName: 'Test User',
    phones: [{ diallingCode: '+48', number: '111222333' }],
    startDate: '2022-03-03',
    endDate: null,
  },
];
