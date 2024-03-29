import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api/api.service';
import { PokeList, SimplePokeData } from 'src/app/model/poke-list.model';
import { PokemonListComponent } from 'src/app/shared/pokemon-list/pokemon-list.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from 'src/app/services/store/store.service';
import { Observable } from 'rxjs';
import { ScaleDirective } from 'src/app/shared/directives/scale.directive';
import { Comment } from 'src/app/model/comment.model';
import { CommentModalComponent } from 'src/app/shared/comment-modal/comment-modal.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PokemonListComponent,
    ReactiveFormsModule,
    ScaleDirective,
    CommentModalComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router
  ) {
    this.favorites$ = storeService.getFavoritesState();
    this.comments$ = storeService.getCommentsState();
  }
  @ViewChild(PokemonListComponent) pokeListComponent!: PokemonListComponent;

  favorites$: Observable<string[]>;
  comments$: Observable<Comment[]>;

  list: SimplePokeData[] = [];
  filteredList: SimplePokeData[] = [];

  search: FormControl = new FormControl('');
  isModalOpen = false;
  selectedPokemon = '';

  ngOnInit(): void {
    this.search.valueChanges.subscribe({
      next: (res: string) => {
        this.filterBySearch(res);
        this.pokeListComponent.currentPage = 1;
      },
    });
    this.apiService.getPokemonList().subscribe({
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
  addFavorite(item: string) {
    this.storeService.addFavoriteState(item);
  }
  removeFavorite(item: string) {
    this.storeService.removeFavoriteState(item);
  }
  removeComment(item: string) {
    this.storeService.removeCommentState(item);
  }
  addComment(item: string) {
    this.openModal(item);
  }
  showDetails(event: string) {
    this.router.navigate(['/details', event]);
  }
  closeModal() {
    this.isModalOpen = false;
  }
  openModal(item: string) {
    this.selectedPokemon = item;
    this.isModalOpen = true;
  }
  saveComment(event: Comment) {
    this.storeService.addCommentState(event);
  }
}
