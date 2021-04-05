import { Component, Input, OnChanges } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { ILayout, IQuestion } from '../../models/questionnaire-model';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent implements OnChanges {
  @Input() isDefault = false;
  @Input() isAdmin = true;
  @Input() layout!: ILayout;
  draggedElementIndex = -1;
  droppedIndex = -1;
  editIndex!: number;
  questions: IQuestion[] = [];

  constructor(
    private userInfoService: UserInfoService,
    private questionnaireService: QuestionnaireService,
  ) { }

  ngOnChanges(): void {
    this.questionnaireService.isEdited = false;
    this.editIndex = -1;
    // sets the laayout being viewed.
    if (this.layout) {
      this.questions = this.layout.questions;
    }
  }

  /**
   * Adds question when button is clicked
   */
  addQuestion(): void {
    if (!this.isDefault && this.questions.length < 10) {
      this.questionnaireService.isEdited = true;
      this.questions.push({ content: '', type: 'TextBox' });
      this.editIndex = this.questions.length - 1;
    }
  }

  /**
   * Edits question
   * @param  {number} index - index of the question being edited
   */
  editQuestion(index: number): void {
    if (!this.isDefault) {
      this.questionnaireService.isEdited = true;
      if (index === this.editIndex) {
        this.editIndex = -1;
      } else {
        this.editIndex = index;
      }
    }
  }

  /**
   * Deletes a question when Admin clicks on delete button
   * @param  {number} index - index of the question to be deleted
   */
   deleteQuestion(index: number): void {
    if (!this.isDefault && this.userInfoService.isAdmin) {
      this.questionnaireService.isEdited = true;
      this.editIndex = -1;
      this.questions.splice(index, 1);
    }
  }

  /**
   * Sets the dragged Element Index when user starts dragging.
   * @param  {number} event - index of the dragged element
   */
  onDragStart(event: number): void {
    if (!this.isDefault) {
      this.draggedElementIndex = event;
    }
  }

  /**
   * Sets the dragged over element when user draggs over an element.
   * @param  {number} event - index of the element being dragged over
   */
  onDragOver(event: number): void {
    if (!this.isDefault) {
      this.droppedIndex = event;
    }
  }
  /**
   * Pushes the dragged element into the dropped location and deletes from earlier location
   */
  onDragEnd(): void {
    if ((this.draggedElementIndex !== -1)
      && (this.droppedIndex !== -1)
      && (this.draggedElementIndex !== this.droppedIndex)) {
      const element = this.questions[this.draggedElementIndex];
      this.questions.splice(this.draggedElementIndex, 1);
      this.questions.splice(this.droppedIndex, 0, element);
      this.questionnaireService.isEdited = true;
    }
    this.draggedElementIndex = -1;
    this.droppedIndex = -1;
  }

  /**
   * Calls service method to save the layout
   */
  saveLayout(): void {
    this.questionnaireService.updateLayout(this.layout).subscribe(() => {
      this.questionnaireService.isEdited = true;
      console.log('Updated successfully');
    });
  }
}
