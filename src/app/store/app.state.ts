import { createAction, createReducer, on, props } from '@ngrx/store';
import { Comment } from '../model/comment.model';

export interface AppState {
  loading: boolean;
  comments: Comment[];
  favorites: string[];
}

export const appInitialState: AppState = {
  loading: false,
  comments: [],
  favorites: [],
};

export const startLoading = createAction('[App] Start loading');
export const stopLoading = createAction('[App] Stop loading');
export const addComment = createAction(
  '[App] Add comment',
  props<{ item: Comment }>()
);
export const removeComment = createAction(
  '[App] Remove comment',
  props<{ item: string }>()
);
export const addFavorite = createAction(
  '[App] Add favorite',
  props<{ item: string }>()
);
export const removeFavorite = createAction(
  '[App] Remove favorite',
  props<{ item: string }>()
);

export const appReducer = createReducer(
  appInitialState,
  on(startLoading, (state): AppState => {
    state = { ...state, loading: true };
    return state;
  }),
  on(stopLoading, (state): AppState => {
    state = { ...state, loading: false };
    return state;
  }),
  on(addFavorite, (state, { item }): AppState => {
    const newFav = [...state.favorites, item];
    state = { ...state, favorites: newFav };
    return state;
  }),
  on(removeFavorite, (state, { item }): AppState => {
    const index = state.favorites.indexOf(item);
    const newFav = [...state.favorites];
    newFav.splice(index, 1);
    state = { ...state, favorites: newFav };
    return state;
  }),
  on(addComment, (state, { item }): AppState => {
    const newCom = [...state.comments, item];
    state = { ...state, comments: newCom };
    return state;
  }),
  on(removeComment, (state, { item }): AppState => {
    const newCom = [...state.comments].filter((i) => item != i.pokemonName);
    state = { ...state, comments: newCom };
    return state;
  })
);
