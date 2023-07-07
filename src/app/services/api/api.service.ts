import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url = environment.apiUrl;

  getPokemonPage(page: number, limit = 10) {
    return this.http.get(`${this.url}?offset=${page}&limit=${limit}`);
  }
}
