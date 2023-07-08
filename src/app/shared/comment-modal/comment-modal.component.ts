import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css'],
})
export class CommentModalComponent {
  isModalOpen = false;
}
