import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState, startLoading, stopLoading } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<{ app: AppState }>) {}

  getLoadingState() {
    return this.store.select('app').pipe(map((state) => state.loading));
  }

  startLoadingState() {
    this.store.dispatch(startLoading());
  }
  stopLoadingState() {
    this.store.dispatch(stopLoading());
  }
}
