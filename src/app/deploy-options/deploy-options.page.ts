import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { CloudApiService } from '../services/cloud-api/cloud-api.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-deploy-options',
  templateUrl: './deploy-options.page.html',
  styleUrls: ['./deploy-options.page.scss'],
})
export class DeployOptionsPage implements OnInit {
  public deployAppForm: FormGroup;
  rate: any;
  image: {};
  packages: {};
  total: any = "Select Bandwidth And Package";
  bandwidth: any ="Select bandwidth";
  image_price: any = "Loading...."
  
  constructor(private formBuilder: FormBuilder,
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    public apiService: ApiCallService,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public cloudApi: CloudApiService,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    private storage: Storage) { 
    this.deployAppForm = this.formBuilder.group({
      name: ['', Validators.required],
      package: ['', Validators.required],
      data: ['', Validators.required],
      port: ['', Validators.required],
      replicas: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.storage.get('image').then(image=>{
      this.image_price = image['price']
      this.image = image
    })
    this.cloudApi.get('get_rate', {'mac_address': this.route.snapshot.paramMap.get('mac-address')})
    .then(response=>{
      this.rate = response['result']
    })

    this.cloudApi.get('get_packages', {})
    .then(response=>{
      this.packages = response
    })
  }

  deloy_app(password: string) {
    let values = this.deployAppForm.value
    values['rate'] = this.rate
    values['price'] = this.image['price']
    values['app'] = this.image['image']
    values['password'] = password
    values['package_id'] = this.deployAppForm.value['package']['id']
    values['type'] = 'deploy'
    values['mac_address'] = this.route.snapshot.paramMap.get('mac-address')
    values = Object.assign({}, values, this.image)
    this.apiService.get('balance', {})
    .then(data => {
        if (data['error']) {
          this.toastService.presentToast(data['error'])
          this.authService.logout()
        } else {
          if(data['balance'] > this.total){
            this.cloudApi.post("deploy", values)
            .then(response=>{
              if(response['result'] == 'Insufficient funds in account' || response['result'] == 'Incorrect password'){
                this.alertService.presentAlert("Error", "Failed To Deploy", response['result'])
              }else{
                this.toastService.presentToast(response['result'])
                this.navCtrl.back()
              }
            })
          }else{
            this.toastService.presentToast("Insufficient Funds. Your Balance Is Less Than "+this.total+ " Coins")
          }
        }
      })
    
  }

  async presentPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Password',
      message: 'Enter Password To Deploy',
      inputs: [
        {
          name: 'password',
          type: 'password',
          label: 'password',
          placeholder: 'Log In Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Save',
          handler: (input_values) => {
            this.deloy_app(input_values['password'])
          }
        }
      ]
    });

    await alert.present();
  }

  getCost() {
    if(this.deployAppForm.value['data']){
      this.bandwidth = (this.deployAppForm.value['data']*this.rate)+" Coins"
      this.total = "Select Package"
      if(this.deployAppForm.value['package'] && this.image_price){
        this.total = (this.deployAppForm.value['data']*this.rate)+this.image_price+this.deployAppForm.value['package']['price']
      }
    }
  }

}
