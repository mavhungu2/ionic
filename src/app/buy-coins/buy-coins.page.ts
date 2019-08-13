import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';
import { ApiCallService } from '../services/api-call/api-call.service';


@Component({
  selector: 'app-buy-coins',
  templateUrl: './buy-coins.page.html',
  styleUrls: ['./buy-coins.page.scss'],
})
export class BuyCoinsPage implements OnInit {
  public buyCoinsForm: FormGroup;
  public todaysDate: String;
  public futureDate: String;
  constructor(private formBuilder: FormBuilder,
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    public loadingService: LoadingService,
    public apiService: ApiCallService
   ) 
  {   
    this.buyCoinsForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvc: ['', Validators.required],
      qty: ['', Validators.required],
      password: ['', Validators.required],
    })

    var year = new Date().getFullYear();
    var month = new Date().getMonth()+1;

    this.todaysDate = new Date(year, month).toISOString();
    this.futureDate = new Date(year + 50, month).toISOString();

}

  ngOnInit() {
  }

  buyCoins() {
    this.apiService.post("send_to_user", this.buyCoinsForm.value)
    .then(response =>{
      if (response['error']) {
        this.alertService.presentAlert("Error", "Please Check Details", response['error'])
      }else{
        this.toastService.presentToast("Transaction Successfull")
        this.navCtrl.navigateRoot(['/home'])
      }
    })
    

  }

}
