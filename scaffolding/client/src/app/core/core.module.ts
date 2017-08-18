import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared';
import { FulllayoutModule } from '../full-layout';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { RouterModule } from '@angular/router';

import { coreDefinition } from './core.global'

import { HeaderComponent } from './dumb-components/header/header.component';
import { MainMenuComponent } from './dumb-components/main-menu/main-menu.component';
import { SearchBoxComponent } from './dumb-components/search-box/search-box.component';
import { LogoContainerComponent } from './dumb-components/logo-container/logo-container.component';
import { FooterComponent } from './dumb-components/footer/footer.component';


@NgModule({
        imports: [
                FulllayoutModule,
                RouterModule,
                SharedModule
        ],
        declarations: [
                HeaderComponent,
                MainMenuComponent,
                SearchBoxComponent,
                LogoContainerComponent,
                FooterComponent
        ].concat(coreDefinition.declarations),
        providers: [],
        exports: [
                SharedModule,
                FooterComponent
        ].concat(coreDefinition.exports)
})
export class CoreModule {
        constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
                throwIfAlreadyLoaded(parentModule, 'CoreModule');
        }
}