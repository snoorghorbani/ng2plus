import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {
  RouteOutlets, LayoutModule
} from '../infra';

import { BaseComponent } from './dumb-components/base/base.component';
import { FullLayoutService } from './full-layout.service';


@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild([FulllayoutModule.routeOutlets.route]),
  ],
  declarations: [BaseComponent],
  providers: [FullLayoutService],
  exports: []
})
export class FulllayoutModule {

  static routeOutlets = new RouteOutlets(BaseComponent);

  static outlets = {
    main: 'main',
    footer: 'footer',
    toolbar: 'toolbar',
    navbar: 'navbar',
    menu: 'menu@navbar',
    search: 'search@navbar',
    logo: 'logo@navbar'
  }

}
