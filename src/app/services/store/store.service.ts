import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { Comment } from 'src/app/model/comment.model';
import {
  AppState,
  addComment,
  addFavorite,
  removeFavorite,
  startLoading,
  stopLoading,
} from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<{ app: AppState }>) {}

  getLoadingState() {
    return this.store.select('app').pipe(map((state) => state.loading));
  }

  getFavoritesState() {
    return this.store.select('app').pipe(map((state) => state.favorites));
  }

  getCommentsState() {
    return this.store.select('app').pipe(map((state) => state.comments));
  }

  startLoadingState() {
    this.store.dispatch(startLoading());
  }
  stopLoadingState() {
    this.store.dispatch(stopLoading());
  }

  addFavoriteState(item: string) {
    this.store.dispatch(addFavorite({ item }));
  }
  removeFavoriteState(item: string) {
    this.store.dispatch(removeFavorite({ item }));
  }
  addCommentState(item: Comment) {
    this.store.dispatch(addComment({ item }));
  }
}
