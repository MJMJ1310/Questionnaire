import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserFlags } from '../models/questionnaire-model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  loginSuccess: boolean = false;
  isAdmin: boolean = false;
  apiUrl = 'http://localhost:3000/api/userInfo/';

  constructor(private httpClient: HttpClient) { }

  /**
   * Calls api to validated user
   * @param  {string} userName - user name entered by user
   * @param  {string} password - password entered by user
   * @returns Observable<IUserFlags> - returns flags specifying if the user is valid and if the user is admin
   */
  validateUser(userName: string, password: string): Observable<IUserFlags> {
    const result = this.httpClient.get<IUserFlags>(`${this.apiUrl}${userName}/${password}`);
    return result;
  }
}
