import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsPanelComponent } from './components/layouts-panel/layouts-panel.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { QuestionnaireService } from './services/questionnaire.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsPanelComponent,
    QuestionListComponent,
    QuestionnaireComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [QuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
