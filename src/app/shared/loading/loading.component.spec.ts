import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { StoreService } from 'src/app/services/store/store.service';
import { provideStore } from '@ngrx/store';
import { of } from 'rxjs';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
      providers: [provideStore()],
    });
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    spyOn(storeService, 'getLoadingState').and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loading$', () => {
    expect(component.loading$).toBeDefined();
  });
});
