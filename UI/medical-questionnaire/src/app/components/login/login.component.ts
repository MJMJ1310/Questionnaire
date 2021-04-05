import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserFlags } from 'src/app/models/questionnaire-model';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
    ) { }

  /**
   * Calls service to validate user
   */
  onSubmit(): void {
    this.userInfoService.validateUser(this.userName, this.password).subscribe((userFlags: IUserFlags) => {
      if(userFlags.isValidUser) {
        this.userInfoService.isAdmin = userFlags.isAdmin;
        this.userInfoService.loginSuccess = true;
        this.router.navigateByUrl('/questionnaire');
      }
    });
  }

}
