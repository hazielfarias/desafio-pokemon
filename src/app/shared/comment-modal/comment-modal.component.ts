import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from 'src/app/model/comment.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css'],
})
export class CommentModalComponent {
  @Output() clickSaveComment = new EventEmitter<Comment>();
  @Output() clickClose = new EventEmitter();
  @Input({ required: true }) pokemonName!: string;
  @Input({ required: true }) isModalOpen!: boolean;

  form = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });

  close() {
    this.clickClose.emit();
  }

  saveComment() {
    const value: Comment = {
      pokemonName: this.pokemonName,
      text: this.form.value.text!,
    };
    this.clickSaveComment.emit(value);
    this.close();
  }
}
