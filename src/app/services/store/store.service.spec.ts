import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { provideStore } from '@ngrx/store';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    const storeSpyObj = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      providers: [provideStore()],
    });

    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
