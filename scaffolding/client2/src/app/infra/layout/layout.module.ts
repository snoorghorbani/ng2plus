import { PositionHelper } from '@swimlane/ngx-charts/release/common/tooltip/position';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// todo : decouple shared module
import { SharedModule } from '../../shared/shared.module';


@NgModule({
        imports: [
                SharedModule, 
                RouterModule,
        ],
        declarations: [],
        // // providers: [OutletService],
        exports: [
        ]
})
export class LayoutModule { }