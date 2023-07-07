import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  constructor(private storeService: StoreService) {}
  loading$ = this.storeService.getLoadingState();
}
