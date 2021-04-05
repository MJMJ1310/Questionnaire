import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILayout } from '../models/questionnaire-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  activeLayout = new BehaviorSubject<any>(null);
  isEdited = false;
  apiUrl = 'http://localhost:3000/api/questionnaire'; 

  constructor(private httpClient: HttpClient) { }

  /**
   * Calls api to get the question layouts
   * @returns Observable<ILayout[]> - list of layouts
   */
  getLayouts(): Observable<ILayout[]> {
    const results = this.httpClient.get<ILayout[]>(this.apiUrl);
    return results;
  }

  /**
   * Calls api to insert a new layout
   * @param  {ILayout} layout - newly cloned layout
   * @returns Observable<string> returns id of inserted layout
   */
  addLayout(layout: ILayout): Observable<string> {
    const layoutId = this.httpClient.post<string>(this.apiUrl, {newLayout: layout} );
    return layoutId;
  }

  /**
   * Calls api to update a layout
   * @param  {ILayout} layout - the updated layout
   * @returns Observable<string> - returns the id of updated layout
   */
  updateLayout(layout: ILayout): Observable<string> {
    const layoutId = this.httpClient.put<string>(this.apiUrl, {updatedLayout: layout} );
    return layoutId;
  }
}
