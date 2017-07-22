import {
  ActionReducer, Action, combineReducers, INITIAL_REDUCER, StoreModule
} from '@ngrx/store';

// import { counterReducer } from '../counter';

export const reducers = {
  // counter: counterReducer
}

export const reducer_config = {
  maxAge: 15
}

export let Add_Reducer = function <T>(state: string, reducer: (state: T, action: Action) => T) {
  reducers[state] = reducer;
  return this;
}

export function reducer<T>(params:{InitialState:T}) {
  return function (target: any) {
    reducers[target.prototype.stateName()] = function (state: T = params.InitialState, action: Action) {
      return target.prototype.reducer(state, action);
    };
  };
}

export interface Reducer<T> {
  stateName(): string;
  reducer: ActionReducer<T>;
}