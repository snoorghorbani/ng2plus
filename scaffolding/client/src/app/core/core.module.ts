import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared';
import { FulllayoutModule } from '../full-layout';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { RouterModule } from '@angular/router';

import {coreDefinition} from '.'

import {
        HeaderComponent,
        MainMenuComponent,
        SearchBoxComponent,
        LogoContainerComponent,
        FooterComponent
} from './';

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