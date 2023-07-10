import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SimplePokeData } from 'src/app/model/poke-list.model';
import { ApiService } from 'src/app/services/api/api.service';
import { StoreService } from 'src/app/services/store/store.service';
import { PokemonListComponent } from 'src/app/shared/pokemon-list/pokemon-list.component';
import { CommentModalComponent } from 'src/app/shared/comment-modal/comment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Comment } from 'src/app/model/comment.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let apiService: jasmine.SpyObj<ApiService>;
  let storeService: jasmine.SpyObj<StoreService>;
  let router: Router;

  const mockList: SimplePokeData[] = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
    { name: 'Charizard', url: 'https://pokeapi.co/api/v2/pokemon/6' },
  ];

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getPokemonList',
    ]);
    const storeServiceSpy = jasmine.createSpyObj('StoreService', [
      'getFavoritesState',
      'getCommentsState',
      'addFavoriteState',
      'removeFavoriteState',
      'removeCommentState',
      'addCommentState',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        PokemonListComponent,
        CommentModalComponent,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        provideStore(),
        provideHttpClient(),
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
      ],
    });

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    storeService = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
    router = TestBed.inject(Router);

    // Configuração dos retornos dos métodos
    apiService.getPokemonList.and.returnValue(
      of({ count: mockList.length, results: mockList })
    );
    storeService.getFavoritesState.and.returnValue(of([]));
    storeService.getCommentsState.and.returnValue(of([]));
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the pokemon list from ApiService', () => {
    component.ngOnInit();

    expect(apiService.getPokemonList).toHaveBeenCalled();
    expect(component.list).toEqual(mockList);
    expect(component.filteredList).toEqual(mockList);
  });

  it('should filter the list based on search term', () => {
    component.list = mockList;

    component.filterBySearch('pika');

    expect(component.filteredList).toEqual([
      { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
    ]);
  });

  it('should add favorite via StoreService', () => {
    const pokemonName = 'Pikachu';

    component.addFavorite(pokemonName);

    expect(storeService.addFavoriteState).toHaveBeenCalledWith(pokemonName);
  });

  it('should remove favorite via StoreService', () => {
    const pokemonName = 'Pikachu';

    component.removeFavorite(pokemonName);

    expect(storeService.removeFavoriteState).toHaveBeenCalledWith(pokemonName);
  });

  it('should remove comment via StoreService', () => {
    const pokemonName = 'Pikachu';

    component.removeComment(pokemonName);

    expect(storeService.removeCommentState).toHaveBeenCalledWith(pokemonName);
  });

  it('should open the comment modal', () => {
    const pokemonName = 'Pikachu';

    component.openModal(pokemonName);

    expect(component.isModalOpen).toBeTrue();
    expect(component.selectedPokemon).toEqual(pokemonName);
  });

  it('should close the comment modal', () => {
    component.closeModal();

    expect(component.isModalOpen).toBeFalse();
  });

  it('should open modal when adding comment', () => {
    const item = 'Pikachu';
    spyOn(component, 'openModal');

    component.addComment(item);

    expect(component.openModal).toHaveBeenCalledWith(item);
  });

  it('should save comment via StoreService', () => {
    const comment: Comment = { pokemonName: 'Pikachu', text: 'Test comment' };

    component.saveComment(comment);

    expect(storeService.addCommentState).toHaveBeenCalledWith(comment);
  });

  it('should navigate to details page', () => {
    const pokemonName = 'Pikachu';
    spyOn(router, 'navigate');

    component.showDetails(pokemonName);

    expect(router.navigate).toHaveBeenCalledWith(['/details', pokemonName]);
  });

  it('should filter list when search value changes', () => {
    const searchTerm = 'pikachu';
    const mockList = [
      { name: 'Pikachu', url: '' },
      { name: 'Charmander', url: '' },
      { name: 'Bulbasaur', url: '' },
    ];
    component.list = mockList;
    component.filteredList = mockList;

    component.search.setValue(searchTerm);

    expect(component.filteredList.length).toBe(1);
    expect(component.filteredList[0].name).toBe('Pikachu');
  });
});
