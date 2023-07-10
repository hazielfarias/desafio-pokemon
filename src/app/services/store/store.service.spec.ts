import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { StoreService } from './store.service';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import {
  AppState,
  addComment,
  addFavorite,
  removeComment,
  removeFavorite,
  startLoading,
  stopLoading,
} from 'src/app/store/app.state';
import { Comment } from 'src/app/model/comment.model';

describe('StoreService', () => {
  let service: StoreService;
  let store: MockStore<{ app: AppState }>;

  const initialState = {
    app: {
      loading: false,
      favorites: [],
      comments: [],
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [provideStore(), StoreService, provideMockStore()],
    });

    service = TestBed.inject(StoreService);
    store = TestBed.inject(Store) as MockStore<{ app: AppState }>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch startLoading action when startLoadingState is called', () => {
    spyOn(store, 'dispatch');
    service.startLoadingState();
    expect(store.dispatch).toHaveBeenCalledWith(startLoading());
  });

  it('should dispatch stopLoading action when stopLoadingState is called', () => {
    spyOn(store, 'dispatch');
    service.stopLoadingState();
    expect(store.dispatch).toHaveBeenCalledWith(stopLoading());
  });

  it('should dispatch addFavorite action with item when addFavoriteState is called', () => {
    spyOn(store, 'dispatch');
    const item = 'Pikachu';
    service.addFavoriteState(item);
    expect(store.dispatch).toHaveBeenCalledWith(addFavorite({ item }));
  });

  it('should dispatch removeFavorite action with item when removeFavoriteState is called', () => {
    spyOn(store, 'dispatch');
    const item = 'Pikachu';
    service.removeFavoriteState(item);
    expect(store.dispatch).toHaveBeenCalledWith(removeFavorite({ item }));
  });

  it('should dispatch addComment action with item when addCommentState is called', () => {
    spyOn(store, 'dispatch');
    const item: Comment = { pokemonName: 'Pikachu', text: 'Test comment' };
    service.addCommentState(item);
    expect(store.dispatch).toHaveBeenCalledWith(addComment({ item }));
  });

  it('should dispatch removeComment action with item when removeCommentState is called', () => {
    spyOn(store, 'dispatch');
    const item = 'Pikachu';
    service.removeCommentState(item);
    expect(store.dispatch).toHaveBeenCalledWith(removeComment({ item }));
  });

  it('should select the loading state from the store', (done) => {
    const loadingState = true;
    store.setState({
      app: { ...initialState.app, loading: loadingState },
    });
    service.getLoadingState().subscribe((state) => {
      expect(state).toEqual(loadingState);
      done();
    });
  });

  it('should select the favorites state from the store', (done) => {
    const favoritesState = ['Pikachu', 'Charizard'];
    store.overrideSelector('app', { favorites: favoritesState });
    service.getFavoritesState().subscribe((state) => {
      expect(state).toEqual(favoritesState);
      done();
    });
  });

  it('should select the comments state from the store', (done) => {
    const commentsState: Comment[] = [
      { pokemonName: 'Pikachu', text: 'Test comment' },
    ];
    store.overrideSelector('app', { comments: commentsState });
    service.getCommentsState().subscribe((state) => {
      expect(state).toEqual(commentsState);
      done();
    });
  });
});
