import { BehaviorSubject } from 'rxjs';

import { FullApplicationListType } from '../types/full-application.type';
import { FullApplicationStatus } from '../enums/full-application-status.enum';

export class FullApplicationList {
  private readonly _fullApplicationsList$ =
    new BehaviorSubject<FullApplicationListType>([]);

  public readonly value$ = this._fullApplicationsList$.asObservable();

  constructor(fullApplicationsList: FullApplicationListType) {
    this._fullApplicationsList$.next(fullApplicationsList);
  }

  public publishOne(applicationId: number): void {
    this.updateApplicationStatus(
      applicationId,
      FullApplicationStatus.PUBLISHED
    );
  }

  public unpublishOne(applicationId: number): void {
    this.updateApplicationStatus(
      applicationId,
      FullApplicationStatus.UNPUBLISHED
    );
  }

  public rejectOne(applicationId: number): void {
    this.updateApplicationStatus(applicationId, FullApplicationStatus.REJECTED);
  }

  public deleteOne(applicationId: number): void {
    this.updateApplicationStatus(applicationId, FullApplicationStatus.DELETED);
  }

  private updateApplicationStatus(
    applicationId: number,
    status: FullApplicationStatus
  ): void {
    this._fullApplicationsList$.next(
      this._fullApplicationsList$
        .getValue()
        .map((application) => {
          if (application.id === applicationId) {
            return {
              ...application,
              status,
            };
          }

          return application;
        })
        .filter(
          (application) => application.status !== FullApplicationStatus.DELETED
        )
    );
  }
}
