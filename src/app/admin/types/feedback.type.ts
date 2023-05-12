export type FeedbackType = Readonly<{
  id: number;
  fullName: string;
  email: string;
  comment: string;
}>;
export type FeedbackListType = ReadonlyArray<FeedbackType>;
