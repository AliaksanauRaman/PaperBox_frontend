import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlusIconModule } from '../shared/icons/plus-icon/plus-icon.module';

import { IndexPageLayoutComponent } from './layouts/index-page-layout/index-page-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ActionsComponent } from './components/actions/actions.component';
import { MainComponent } from './components/main/main.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { FooterComponent } from './components/footer/footer.component';

const CORE_DECLARATIONS = [
  IndexPageLayoutComponent,
  HeaderComponent,
  ToolbarComponent,
  LanguageSwitcherComponent,
  ActionsComponent,
  MainComponent,
  NavigationMenuComponent,
  FooterComponent,
];

@NgModule({
  imports: [
    RouterModule,
    PlusIconModule,
  ],
  declarations: CORE_DECLARATIONS,
  exports: CORE_DECLARATIONS,
})
export class CoreModule {}
