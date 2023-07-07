import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Pokemon } from 'src/app/model/pokemon.model';
import { SimplePokeData } from 'src/app/model/poke-list.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  @Input({ required: true }) list!: SimplePokeData[];
  currentPage = 1;
  itemsPerPage = 10;
}
