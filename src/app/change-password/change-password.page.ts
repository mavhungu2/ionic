import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public apiService: ApiCallService) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: ChangePasswordPage.passwords_match });
   }

  ngOnInit() {
  }

  static passwords_match(cg: FormGroup): { [err: string]: any } {
    let pwd1 = cg.get('confirmPassword');
    let pwd2 = cg.get('new_password');
    let rv: { [error: string]: any } = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  
  change_password() {
    this.apiService.post('change_password', this.passwordForm.value)
      .then(response => {
        if (response['error']) {
          this.alertService.presentAlert("Error", "Please Check Details", "Incorect Old Password")
        }else{
          this.toastService.presentToast("Password Changed Successfully")
          this.navCtrl.back()
        }
      })
    
  }

}
