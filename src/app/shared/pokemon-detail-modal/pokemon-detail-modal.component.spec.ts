import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailModalComponent } from './pokemon-detail-modal.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/model/pokemon.model';
import { ApiService } from 'src/app/services/api/api.service';
import { routes } from 'src/app/app.routes';

describe('PokemonDetailModalComponent', () => {
  let component: PokemonDetailModalComponent;
  let fixture: ComponentFixture<PokemonDetailModalComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailModalComponent, CommonModule],
      providers: [
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { pokemon: 'Pikachu' } } },
        },
        {
          provide: ApiService,
          useValue: {
            getPokemonData: () => of({ name: 'Pikachu' } as Pokemon),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: ApiService,
          useValue: {
            getPokemonData: jasmine.createSpy('getPokemonData').and.returnValue(
              of({
                name: 'Pikachu',
                type: 'Electric',
                abilities: ['Static', 'Lightning Rod'],
              } as unknown as Pokemon)
            ),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailModalComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize parametro with the value from the route params', () => {
    expect(component.parametro).toBe('Pikachu');
  });

  it('should navigate to home when closeDetails is called', () => {
    component.closeDetails();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should retrieve pokemon data on ngOnInit and set it to data', () => {
    component.ngOnInit();
    expect(route.snapshot.params['pokemon']).toBe('Pikachu');
    expect(apiService.getPokemonData).toHaveBeenCalledWith('Pikachu');
    expect(component.data).toEqual({
      name: 'Pikachu',
      type: 'Electric',
      abilities: ['Static', 'Lightning Rod'],
    } as unknown as Pokemon);
  });
});
