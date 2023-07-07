import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
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
  @Input({ required: true }) favorites!: string[] | null;
  @Output() clickAddFavorite = new EventEmitter<string>();
  @Output() clickRemoveFavorite = new EventEmitter<string>();
  public currentPage = 1;
  itemsPerPage = 10;

  addFavorite(item: string) {
    this.clickAddFavorite.emit(item);
  }
  removeFavorite(item: string) {
    this.clickRemoveFavorite.emit(item);
  }
}
