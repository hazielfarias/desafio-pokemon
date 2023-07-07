import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading.component';
import { PokeList } from './model/poke-list.model';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    this.service.getPokemonList().subscribe({
      next: (res: PokeList) => {
        this.service.setMaxPokemon(res.count);
      },
    });
  }
}
