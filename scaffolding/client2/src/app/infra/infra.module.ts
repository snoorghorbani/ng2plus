import { NgModule } from '@angular/core';

import {
  LayoutModule,
  AppStoreModule
} from '.';

@NgModule({
  imports: [
    LayoutModule,
    AppStoreModule
  ],
  declarations: [],
  exports: [
    LayoutModule,
    AppStoreModule
  ]
})
export class InfraModule { }
