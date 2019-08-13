import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading/loading.service';
import { ToastService } from '../services/toast/toast.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { AlertService } from '../services/alert/alert.service';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  balance: String;
  public transferCoinsForm: FormGroup;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private toastService: ToastService,
    public apiService: ApiCallService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public alertService: AlertService){
    this.transferCoinsForm = this.formBuilder.group({
      receiver_email: ['', Validators.required],
      qty: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ionViewWillEnter(){
    this.update_balance()
  }

  buyCoins() {
    this.navCtrl.navigateForward(['/buy-coins'])
  }

  transferCoins() {
    var values = this.transferCoinsForm.value;
    this.transferCoinsForm.reset();
    this.apiService.post('send_to_riot_wallet', values)
      .then(data => {
        var response = data
        if(response['result']){
          this.toastService.presentToast(response['result'])
        }
        if(response['error']){
          this.toastService.presentToast(response['error'])
        }
        this.update_balance();
      })
  }

  update_balance() {
    this.apiService.get('balance', {})
    .then(data => {
        if (data['error']) {
          this.toastService.presentToast(data['error'])
          this.apiService.logOut()
          this.authService.logout()
        } else {
          this.balance = data['balance']
        }
      })
    
  }
}
