import { NgModule } from '@angular/core';

import { IndexPageLayoutComponent } from './layouts/index-page-layout/index-page-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const CORE_DECLARATIONS = [
  IndexPageLayoutComponent,
  HeaderComponent,
  FooterComponent,
];

@NgModule({
  imports: [],
  declarations: CORE_DECLARATIONS,
  exports: CORE_DECLARATIONS,
})
export class CoreModule {}
