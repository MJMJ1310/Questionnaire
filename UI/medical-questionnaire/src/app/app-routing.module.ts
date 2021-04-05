import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'questionnaire', component: QuestionnaireComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
