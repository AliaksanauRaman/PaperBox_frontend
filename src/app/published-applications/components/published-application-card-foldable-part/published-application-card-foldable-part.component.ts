import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { filter, tap } from 'rxjs';

import { ApplicationCardCommentComponent } from '../application-card-comment/application-card-comment.component';
import { ApplicationCardPhonesComponent } from '../application-card-phones/application-card-phones.component';
import { ApplicationCardActionsComponent } from '../application-card-actions/application-card-actions.component';

import { ApplicationCardExpandStateService } from '../../services/application-card-expand-state.service';
import { ApplicationCardAuthorStateService } from '../../services/application-card-author-state.service';
import { ConfirmApplicationDeletionDialogService } from '@core/services/confirm-application-deletion-dialog.service';

import { PublishedApplicationType } from '../../types/published-application.type';
import { PublishedApplicationsService } from '../../services/published-applications.service';

type PublishedApplicationInterface = Pick<
  PublishedApplicationType,
  'id' | 'comment' | 'publicId' | 'phones'
>;

@Component({
  selector: 'app-published-application-card-foldable-part',
  templateUrl: './published-application-card-foldable-part.component.html',
  styleUrls: ['./published-application-card-foldable-part.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ApplicationCardCommentComponent,
    ApplicationCardPhonesComponent,
    ApplicationCardActionsComponent,
  ],
})
export class PublishedApplicationCardFoldablePartComponent {
  @Input()
  public set publishedApplication(value: PublishedApplicationInterface) {
    this._publishedApplication = value;
  }

  protected _publishedApplication?: PublishedApplicationInterface;

  protected readonly _expandStateService = inject(
    ApplicationCardExpandStateService
  );
  protected readonly _authorStateService = inject(
    ApplicationCardAuthorStateService
  );
  private readonly _confirmService = inject(
    ConfirmApplicationDeletionDialogService
  );
  private readonly _publishedApplicationsService = inject(
    PublishedApplicationsService
  );

  protected handleDeleteAction(): void {
    this._confirmService
      .openDialog()
      .pipe(
        filter((isConfirmed) => isConfirmed),
        tap(() => {
          const id = this._publishedApplication?.id;

          if (id === undefined) {
            throw new Error(
              'Id of the published application cannot be undefined!'
            );
          }

          this._publishedApplicationsService.deleteOne(id);
        })
      )
      .subscribe();
  }
}
