import {
    RouteOutlets
} from './infra';

import {
    BaseComponent
} from './full-layout/dumb-components/base/base.component';

import {
    FulllayoutModule
} from './full-layout/full-layout.module';

import {
    MainMenuComponent,
    // UpperMenuComponent,
    SearchBoxComponent,
    FooterComponent,
    LogoContainerComponent
} from './core';

FulllayoutModule.routeOutlets
    // .add_outlet({
    //     component: UpperMenuComponent,
    //     outlet: FulllayoutModule.outlets.toolbar
    // })
    .add_outlet({
        component: MainMenuComponent,
        outlet: FulllayoutModule.outlets.menu
    })
    // .add_outlet({
    //     component: SearchBoxComponent,
    //     outlet: LargelayoutModule.outlets.search
    // })
    .add_outlet({
        component: LogoContainerComponent,
        outlet: FulllayoutModule.outlets.logo
    })
    .add_outlet({
        component: FooterComponent,
        outlet: FulllayoutModule.outlets.footer
    });