import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SimplePokeData } from 'src/app/model/poke-list.model';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  @Input({ required: true }) list!: SimplePokeData[];
  @Input({ required: true }) comments!: Comment[] | null;
  @Input({ required: true }) favorites!: string[] | null;
  @Output() clickAddFavorite = new EventEmitter<string>();
  @Output() clickRemoveFavorite = new EventEmitter<string>();
  @Output() clickAddComment = new EventEmitter<string>();
  @Output() clickRemoveComment = new EventEmitter<string>();
  public currentPage = 1;
  itemsPerPage = 10;

  addFavorite(item: string) {
    this.clickAddFavorite.emit(item);
  }
  removeFavorite(item: string) {
    this.clickRemoveFavorite.emit(item);
  }

  addComment(item: string) {
    this.clickAddComment.emit(item);
  }

  removeComment(item: string) {
    this.clickRemoveComment.emit(item);
  }

  hasComment(item: string) {
    return (
      this.comments &&
      this.comments?.filter((i) => i.pokemonName == item).length > 0
    );
  }
  getComment(item: string) {
    if (!this.comments) return 'Sem comentários';
    const comment = this.comments?.filter((i) => i.pokemonName == item);
    if (comment.length == 0) return 'Sem comentários';
    return comment[0].text;
  }
}
