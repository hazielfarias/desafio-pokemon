import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    this.service.getPokemonPage(0).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
