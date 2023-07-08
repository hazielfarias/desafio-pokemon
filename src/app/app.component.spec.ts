import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { of } from 'rxjs';
import { PokeList } from './model/poke-list.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading.component';
import { provideStore } from '@ngrx/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, LoadingComponent, CommonModule, RouterOutlet],
      providers: [ApiService, provideHttpClient(), provideStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getPokemonList').and.returnValue(
      of({ count: 10 } as PokeList)
    );
    spyOn(apiService, 'setMaxPokemon');
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call getPokemonList on initialization', () => {
    expect(apiService.getPokemonList).toHaveBeenCalled();
  });

  it('should call setMaxPokemon with the response count', () => {
    expect(apiService.setMaxPokemon).toHaveBeenCalledWith(10);
  });
});
