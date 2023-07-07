import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api/api.service';
import { PokeList, SimplePokeData } from 'src/app/model/poke-list.model';
import { Pokemon } from 'src/app/model/pokemon.model';
import { PokemonListComponent } from 'src/app/shared/pokemon-list/pokemon-list.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonListComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ApiService) {}

  list: SimplePokeData[] = [];
  filteredList: SimplePokeData[] = [];

  search: FormControl = new FormControl('');

  ngOnInit(): void {
    this.search.valueChanges.subscribe({
      next: (res: string) => {
        this.filterBySearch(res);
      },
    });
    this.service.getPokemonList().subscribe({
      next: (res: PokeList) => {
        this.list = res.results;
        this.filteredList = res.results;
      },
    });
  }

  filterBySearch(term: string) {
    this.filteredList = this.list.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
