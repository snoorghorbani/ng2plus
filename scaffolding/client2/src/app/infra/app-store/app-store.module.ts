import { InjectionToken, NgModule } from "@angular/core"
import {
  ActionReducer, Action, combineReducers, INITIAL_REDUCER, StoreModule
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  EffectsModule 
} from '@ngrx/effects';

import { reducers, reducer_config } from './reducer';
import { MainEffects } from './effects';

@NgModule({
  imports: [
    StoreModule.provideStore(reducers),
    StoreDevtoolsModule.instrumentOnlyWithExtension(reducer_config),
    EffectsModule.run(MainEffects)
  ]
})
export class AppStoreModule { }