export type LanguageNavigator = Pick<NavigatorLanguage, 'language'>;

export class MockNavigator implements LanguageNavigator {
  constructor(public readonly language: string) {}
}
