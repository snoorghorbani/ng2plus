import { Injector, NgModule, Injectable } from "@angular/core"
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { reducer, Reducer } from '../app-store/reducer';
// import { INCREMENT, DECREMENT } from '../counter';

@Injectable()
export class MainEffects {

    constructor(private action$: Actions) { }

    // @Effect()
    // savePerson$ = this.action$
    //     .ofType(INCREMENT)
    //     .switchMap(() =>
    //         Observable.of({ type: DECREMENT })
    //     );
}