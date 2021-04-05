import { Component, OnInit } from '@angular/core';
import { ILayout, IQuestion } from '../../models/questionnaire-model';
import { UserInfoService } from '../../services/user-info.service';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  isDefaultActive!: boolean;
  isAdmin!: boolean;
  questions!: IQuestion[];
  layouts!: ILayout[];
  selectedLayout!: ILayout;


  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private userInfoService: UserInfoService,
  ) { }

  ngOnInit(): void {
    // redirects to login page if user tries to enter url before logging in
    if (!this.userInfoService.loginSuccess) {
      this.router.navigateByUrl('/');
    }
    // calls service to get the layout list
    this.questionnaireService.getLayouts().subscribe((data) => {
      this.layouts = data;
      this.questionnaireService.activeLayout.next(this.layouts[0]);
      this.subscribeActiveLayout();
    });
    this.isDefaultActive = true;
  }

  /**
   * Subscribes to the active layout change
   */
  subscribeActiveLayout(): void {
    this.questionnaireService.activeLayout.subscribe((layout) => {
      if (layout) {
        this.isDefaultActive = layout._id === this.layouts[0]._id;
        this.selectedLayout = layout;
      }
    });
  }

}
