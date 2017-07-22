import { FulllayoutModule } from '../full-layout';

import {
    IndexComponent
} from '.';

FulllayoutModule.routeOutlets
    .add_child({
        path: '',
        component: IndexComponent
    });