import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentModalComponent } from './comment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Comment } from 'src/app/model/comment.model';

describe('CommentModalComponent', () => {
  let component: CommentModalComponent;
  let fixture: ComponentFixture<CommentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommentModalComponent, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(CommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickSaveComment event with comment value when saveComment is called', () => {
    spyOn(component.clickSaveComment, 'emit');
    component.pokemonName = 'Pikachu';
    component.form.setValue({ text: 'Test comment' });
    const expectedComment: Comment = {
      pokemonName: 'Pikachu',
      text: 'Test comment',
    };
    component.saveComment();
    expect(component.clickSaveComment.emit).toHaveBeenCalledWith(
      expectedComment
    );
  });

  it('should emit clickClose event and reset form when close is called', () => {
    spyOn(component.clickClose, 'emit');
    component.form.setValue({ text: 'Test comment' });
    component.close();
    expect(component.form.value.text).toBe('' || null);
    expect(component.clickClose.emit).toHaveBeenCalled();
  });
});
