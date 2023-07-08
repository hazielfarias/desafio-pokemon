import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailModalComponent } from './pokemon-detail-modal.component';

describe('PokemonDetailModalComponent', () => {
  let component: PokemonDetailModalComponent;
  let fixture: ComponentFixture<PokemonDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonDetailModalComponent]
    });
    fixture = TestBed.createComponent(PokemonDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
