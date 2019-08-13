import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { ApiCallService } from '../services/api-call/api-call.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private login: FormGroup;
  private register: FormGroup;
  public forms: any;

  constructor(private formBuilder: FormBuilder,
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    public apiService: ApiCallService,
    private authService: AuthenticationService,
    public menuCtrl: MenuController) {
      this.login = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
  
      this.register = this.formBuilder.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        address: ['', Validators.required],
        account: ['', Validators.required],
        contact: ['', Validators.required],
        password: ['', Validators.required],
      });
     }
    
  ionViewDidEnter() {
    this.authService.logout()
  }
  ngOnInit() {
    
  }

  async validateData() {
    this.apiService.post('login', this.login.value)
    .then(data => {
      if (data['token']) {
        this.login.reset()
        this.toastService.presentToast("Welcome Back")
      }
      if (data['error']) {
        this.alertService.presentAlert("Check Details", "Failed To Log You In", "Please Verify Your Details");
      }   
      })
  }

  register_user() {
    var values = this.register.value
    values['usertype'] = "user"
    this.apiService.post('register', values)
    .then(response => { 
        if (response['error']) {
          this.alertService.presentAlert("Error", "Please Check Details", response['error'])
        }
        if(response['message']){
          this.register.reset();
          this.forms = "old"
          this.toastService.presentToast(response['message'])
        }
    })
  }

}
