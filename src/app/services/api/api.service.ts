import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { PokeList } from 'src/app/model/poke-list.model';
import { Pokemon } from 'src/app/model/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  maxPokemon = 1300;

  url = environment.apiUrl;

  setMaxPokemon(value: number) {
    this.maxPokemon = value;
  }

  getPokemonList() {
    return this.http.get<PokeList>(`${this.url}?limit=${this.maxPokemon}`);
  }

  getPokemonData(pokemon: string) {
    return this.http.get<Pokemon>(`${this.url}/${pokemon}`);
  }
}
