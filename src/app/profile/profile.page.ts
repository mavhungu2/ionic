import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ApiCallService } from '../services/api-call/api-call.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthenticationService, private apiService:ApiCallService) { }

  ngOnInit() {
  }

  logOut() {
    this.apiService.logOut()
    this.authService.logout()
  }
}
