import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-data-usage',
  templateUrl: './data-usage.page.html',
  styleUrls: ['./data-usage.page.scss'],
})
export class DataUsagePage implements OnInit {
  
  dataUsage: any;

  constructor(
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    public apiService: ApiCallService,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController) { 
    
     this.get_usage()
  }

  ngOnInit() {
  }

  get_usage(){
    this.apiService.get("data_usage", {})
    .then(response=>{
      console.log(response)
      this.dataUsage = response
    })
    
  }

  async present_prompt(device_mac :string, base_station: string, rate: string) {
    const alert = await this.alertCtrl.create({
      header: 'Choose Data Bundle',
      inputs: [
        {
          type: 'radio',
          label: '100MB',
          value: '100',
          checked: true
        },
        {
          type: 'radio',
          label: '300MB',
          value: '300'
        },
        {
          type: 'radio',
          label: '500MB',
          value: '500'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Submit',
          handler: (input_values) => {
            this.load_data(device_mac, base_station, parseInt(rate), input_values)
          }
        }
      ]
    });

    await alert.present();
  }

  async load_data(device_mac :string, base_station: string, rate: number, data: number){
    const alert = await this.alertCtrl.create({
      header: 'Enter Password To Confirm Action',
      message: 'Total Cost: '+(rate*data)+' Coins',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Your Password'
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
          text: 'Submit',
          handler: (input_values) => {
            console.log(input_values)
            this.apiService.post('increase_container_data',{'device_mac_address': device_mac,'base_station_mac_address': base_station, 'data': data, 'rate': rate, 'password': input_values['password']})
            .then(response=>{
              console.log(response)
              if(response['error']){
                this.toastService.presentToast(response['error'])
              }else{
                if(response['result']){
                  this.toastService.presentToast(response['result'])
                }else{
                  this.toastService.presentToast("Transaction Successful")
                }
              }
              this.get_usage()
            })
            
          }
        }
      ]
    });

    await alert.present();
  }

}
