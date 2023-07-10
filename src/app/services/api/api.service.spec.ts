import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { PokeList } from 'src/app/model/poke-list.model';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/model/pokemon.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [ApiService, { provide: HttpClient, useValue: spy }],
    });
    service = TestBed.inject(ApiService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the maxPokemon value', () => {
    const value = 1500;
    service.setMaxPokemon(value);
    expect(service.maxPokemon).toEqual(value);
  });

  it('should make a GET request to the API for the pokemon list', () => {
    const pokeList: PokeList = { count: 10, results: [] };
    httpClientSpy.get.and.returnValue(of(pokeList));

    service.getPokemonList().subscribe((data) => {
      expect(data).toEqual(pokeList);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${environment.apiUrl}?limit=${service.maxPokemon}`
    );
  });

  it('should make a GET request to the API for the pokemon data', () => {
    const pokemonName = 'pikachu';
    const pokemon: Pokemon = {
      name: 'Pikachu',
      types: [
        {
          slot: 1,
          type: {
            name: 'Electric',
          },
        },
      ],
      id: 0,
      height: 0,
      weight: 0,
      stats: [],
      sprites: {
        other: {
          home: {
            front_default: '',
          },
        },
      },
    };
    httpClientSpy.get.and.returnValue(of(pokemon));

    service.getPokemonData(pokemonName).subscribe((data) => {
      expect(data).toEqual(pokemon);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${environment.apiUrl}/${pokemonName}`
    );
  });
});
