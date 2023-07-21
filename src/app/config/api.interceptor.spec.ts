import { TestBed, fakeAsync } from '@angular/core/testing';
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { apiInterceptor } from './api.interceptor';
import { provideStore } from '@ngrx/store';
import { StoreService } from '../services/store/store.service';
import { Observable, of, switchMap } from 'rxjs';

describe('apiInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiInterceptor(req, next));
  let storeService: StoreService;
  let mockHttpRequest: HttpRequest<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore()],
    });
    storeService = TestBed.inject(StoreService);
    mockHttpRequest = new HttpRequest<unknown>('GET', '/api/resource');
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should be call startLoadingState on start request', () => {
    function mockHttpHandler(
      req: HttpRequest<unknown>
    ): Observable<HttpEvent<unknown>> {
      // Aqui você pode implementar a lógica do mock conforme sua necessidade
      const mockData = { message: 'Mock HTTP response data' };
      const httpResponse = new HttpResponse({ body: mockData });

      // Retornando um Observable com a resposta mockada
      return of(httpResponse);
    }
    spyOn(storeService, 'startLoadingState');
    interceptor(mockHttpRequest, mockHttpHandler);
    expect(storeService.startLoadingState).toHaveBeenCalled();
  });

  it('should be call stopLoadingState on end request', fakeAsync(() => {
    function mockHttpHandler(
      req: HttpRequest<unknown>
    ): Observable<HttpEvent<unknown>> {
      // Aqui você pode implementar a lógica do mock conforme sua necessidade
      const mockData = { message: 'Mock HTTP response data' };
      const httpResponse = new HttpResponse({ body: mockData });

      // Retornando um Observable com a resposta mockada
      return of(httpResponse);
    }
    spyOn(storeService, 'stopLoadingState');
    interceptor(mockHttpRequest, mockHttpHandler).subscribe((res) => res);
    expect(storeService.stopLoadingState).toHaveBeenCalled();
  }));
});
