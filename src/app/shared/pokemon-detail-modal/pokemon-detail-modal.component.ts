import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Pokemon } from 'src/app/model/pokemon.model';

@Component({
  selector: 'app-pokemon-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail-modal.component.html',
  styleUrls: ['./pokemon-detail-modal.component.css'],
})
export class PokemonDetailModalComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}
  parametro = '';
  data: Pokemon | undefined;
  closeDetails() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.parametro = this.route.snapshot.params['pokemon'];
    console.log(this.parametro);

    if (this.parametro) {
      this.apiService.getPokemonData(this.parametro).subscribe({
        next: (res) => {
          this.data = res;
          console.log(this.data);
        },
      });
    }
  }
}
