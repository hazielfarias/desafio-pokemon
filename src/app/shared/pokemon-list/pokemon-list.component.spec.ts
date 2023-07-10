import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { CommonModule } from '@angular/common';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent, CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickAddFavorite event when addFavorite is called', () => {
    spyOn(component.clickAddFavorite, 'emit');
    const item = 'Pikachu';
    component.addFavorite(item);
    expect(component.clickAddFavorite.emit).toHaveBeenCalledWith(item);
  });

  it('should emit clickRemoveFavorite event when removeFavorite is called', () => {
    spyOn(component.clickRemoveFavorite, 'emit');
    const item = 'Pikachu';
    component.removeFavorite(item);
    expect(component.clickRemoveFavorite.emit).toHaveBeenCalledWith(item);
  });

  it('should emit clickAddComment event when addComment is called', () => {
    spyOn(component.clickAddComment, 'emit');
    const item = 'Pikachu';
    component.addComment(item);
    expect(component.clickAddComment.emit).toHaveBeenCalledWith(item);
  });

  it('should emit clickRemoveComment event when removeComment is called', () => {
    spyOn(component.clickRemoveComment, 'emit');
    const item = 'Pikachu';
    component.removeComment(item);
    expect(component.clickRemoveComment.emit).toHaveBeenCalledWith(item);
  });

  it('should emit clickShowDetails event when showDetails is called', () => {
    spyOn(component.clickShowDetails, 'emit');
    const item = 'Pikachu';
    component.showDetails(item);
    expect(component.clickShowDetails.emit).toHaveBeenCalledWith(item);
  });

  it('should return true if comments exist for the given item', () => {
    component.comments = [{ pokemonName: 'Pikachu', text: 'Test comment' }];
    const result = component.hasComment('Pikachu');
    expect(result).toBe(true);
  });

  it('should return false if comments do not exist for the given item', () => {
    component.comments = [];
    const result = component.hasComment('Pikachu');
    expect(result).toBe(false);
  });

  it('should return "Sem comentários" if comments do not exist', () => {
    component.comments = [];
    const result = component.getComment('Pikachu');
    expect(result).toBe('Sem comentários');
  });

  it('should return "Sem comentários" if comments exist but not for the given item', () => {
    component.comments = [{ pokemonName: 'Bulbasaur', text: 'Test comment' }];
    const result = component.getComment('Pikachu');
    expect(result).toBe('Sem comentários');
  });

  it('should return the comment text if comments exist for the given item', () => {
    component.comments = [{ pokemonName: 'Pikachu', text: 'Test comment' }];
    const result = component.getComment('Pikachu');
    expect(result).toBe('Test comment');
  });
});
