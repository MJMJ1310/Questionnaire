import { Component, Input } from '@angular/core';
import { ILayout } from '../../models/questionnaire-model';
import { QuestionnaireService } from '../../services/questionnaire.service';

@Component({
  selector: 'app-layouts-panel',
  templateUrl: './layouts-panel.component.html',
  styleUrls: ['./layouts-panel.component.scss']
})
export class LayoutsPanelComponent {
  @Input() layouts: ILayout[] = [];
  activeLayout = 0;

  constructor(private questionnaireService: QuestionnaireService) { }

  /**
   * Sets the active layout when user chooses one.
   * @param  {number} index
   */
  setActiveLayout(index: number): void {
    this.saveLayoutChanges();
    this.activeLayout = index;
    this.questionnaireService.activeLayout.next(this.layouts[index]);
  }

  /**
   * Calls service to save the changes in current layout when user chooses another layout
   */
  saveLayoutChanges(): void {
    if (this.questionnaireService.isEdited) {
      this.questionnaireService.updateLayout(this.layouts[this.activeLayout]).subscribe(() => {
        console.log('Updated successfully');
      });
    }
  }

  /**
   * Clones the layout when clicks on corresponding clone button and calls service
   * to save insert new layout.
   * @param  {number} index - index of the layout being cloned
   */
  cloneLayout(index: number) {
    const layout = Object.assign({}, { ...this.layouts[index], name: `Clone Layout ${this.layouts.length}` });
    this.questionnaireService.addLayout(layout).subscribe((layoutId) => {
      this.layouts.push({
        questions: JSON.parse(JSON.stringify([...layout.questions])),
        name: layout.name,
        _id: layoutId,
      });
    });
  }

}
