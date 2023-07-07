import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, finalize } from 'rxjs';
import { StoreService } from '../services/store/store.service';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const storeService = inject(StoreService);
  storeService.startLoadingState();

  return next(req).pipe(
    catchError((error) => {
      const err = new Error(error.message);
      console.error(error);
      return throwError(() => err);
    }),
    finalize(() => storeService.stopLoadingState())
  );
};
