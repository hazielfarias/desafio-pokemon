import { createAction, createReducer, on } from '@ngrx/store';

export interface AppState {
  loading: boolean;
}

export const appInitialState: AppState = {
  loading: false,
};

export const startLoading = createAction('[App] Start loading');
export const stopLoading = createAction('[App] Stop loading');

export const appReducer = createReducer(
  appInitialState,
  on(startLoading, (state): AppState => {
    state = { ...state, loading: true };
    return state;
  }),
  on(stopLoading, (state): AppState => {
    state = { ...state, loading: false };
    return state;
  })
);
