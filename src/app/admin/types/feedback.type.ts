import { FeedbackStatus } from '../enums/feedback-status.enum';

export type FeedbackType = Readonly<{
  id: number;
  fullName: string;
  email: string;
  comment: string;
  status: FeedbackStatus;
}>;
export type FeedbackListType = ReadonlyArray<FeedbackType>;
