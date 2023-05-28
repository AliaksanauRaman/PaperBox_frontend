import { BehaviorSubject } from 'rxjs';

import { FeedbackListType } from '../types/feedback.type';
import { FeedbackStatus } from '../enums/feedback-status.enum';

export class FeedbackList {
  private readonly _feedbackList$ = new BehaviorSubject<FeedbackListType>([]);

  public readonly value$ = this._feedbackList$.asObservable();

  constructor(initialValue: FeedbackListType) {
    this.setValue(initialValue);
  }

  public setValue(value: FeedbackListType): void {
    this._feedbackList$.next(value);
  }

  public waitOne(feedbackId: number): void {
    this.updateFeedbackStatus(feedbackId, FeedbackStatus.WAITING);
  }

  public processOne(feedbackId: number): void {
    this.updateFeedbackStatus(feedbackId, FeedbackStatus.PROCESSED);
  }

  public deleteOne(feedbackId: number): void {
    this.updateFeedbackStatus(feedbackId, FeedbackStatus.DELETED);
  }

  private updateFeedbackStatus(
    feedbackId: number,
    status: FeedbackStatus
  ): void {
    this._feedbackList$.next(
      this._feedbackList$
        .getValue()
        .map((feedback) => {
          if (feedback.id === feedbackId) {
            return {
              ...feedback,
              status,
            };
          }

          return feedback;
        })
        .filter(({ status }) => status !== FeedbackStatus.DELETED)
    );
  }
}
