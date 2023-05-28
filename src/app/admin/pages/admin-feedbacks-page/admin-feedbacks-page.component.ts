import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { catchError, finalize, takeUntil, tap } from 'rxjs';

import { AdminFeedbacksHttpService } from '../../services/admin-feedbacks-http.service';

import { AdminContentPageComponent } from '../../classes/admin-content-page.component';
import { FeedbackList } from '../../classes/feedback-list.class';
import { FeedbackType } from '../../types/feedback.type';
import { FeedbackStatus } from '../../enums/feedback-status.enum';

@Component({
  selector: 'app-admin-feedbacks-page',
  templateUrl: './admin-feedbacks-page.component.html',
  styleUrls: [
    './admin-feedbacks-page.component.scss',
    '../../styles/_admin-page-common.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFeedbacksPageComponent
  extends AdminContentPageComponent
  implements OnInit
{
  protected _feedbackList = new FeedbackList([]);
  protected _getAllFeedbacksError = false;

  constructor(
    private readonly _adminFeedbacksHttpService: AdminFeedbacksHttpService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.makeHttpRequestToGetAllFeedbacks();
  }

  protected trackFeedbackById(_index: number, feedback: FeedbackType): number {
    return feedback.id;
  }

  protected handleWaitFeedbackClick(feedbackId: number): void {
    this._adminFeedbacksHttpService
      .updateStatusOfOne(feedbackId, FeedbackStatus.WAITING)
      .pipe(
        tap(() => this._feedbackList.waitOne(feedbackId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected handleProcessFeedbackClick(feedbackId: number): void {
    this._adminFeedbacksHttpService
      .updateStatusOfOne(feedbackId, FeedbackStatus.PROCESSED)
      .pipe(
        tap(() => this._feedbackList.processOne(feedbackId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected handleDeleteFeedbackClick(feedbackId: number): void {
    const isConfirmed = confirm(
      `Are you sure you want to delete the feedback with id: ${feedbackId}?`
    );

    if (!isConfirmed) {
      return;
    }

    this._adminFeedbacksHttpService
      .updateStatusOfOne(feedbackId, FeedbackStatus.DELETED)
      .pipe(
        tap(() => this._feedbackList.deleteOne(feedbackId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private makeHttpRequestToGetAllFeedbacks(): void {
    this._adminFeedbacksHttpService
      .getAll()
      .pipe(
        tap((allFeedbacks) => this._feedbackList.setValue(allFeedbacks)),
        catchError((error: unknown) => {
          this._getAllFeedbacksError = true;
          throw error;
        }),
        finalize(() => {
          this._loading = false;
          this._cdRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
