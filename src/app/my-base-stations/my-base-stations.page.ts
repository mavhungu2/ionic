import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ActionSheetController, AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { CloudApiService } from '../services/cloud-api/cloud-api.service';
import { ApiCallService } from '../services/api-call/api-call.service';


@Component({
  selector: 'app-my-base-stations',
  templateUrl: './my-base-stations.page.html',
  styleUrls: ['./my-base-stations.page.scss'],
})
export class MyBaseStationsPage implements OnInit {
  public baseStations: any;
  constructor(
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    public apiService: ApiCallService,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public cloudApi: CloudApiService,
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.get_base_stations()
  }

  get_base_stations(){
    this.apiService.get('get_base_stations', {})
    .then(response=>{
      console.log(response)
      this.baseStations = response['results']
    })
  }

  // async presentActionSheet(id: string, base_station: string, mac_address: string) {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: base_station,
  //     buttons: [
  //       {
  //         text: 'Delete  Base Station',
  //         icon: 'trash',
  //         role: 'destructive',
  //         handler: () => {
  //           this.present_prompt(id, mac_address)
  //         }
  //       }, {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         icon: 'close',
  //         handler: () => {
  //         }
  //       }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  async present_prompt(id: string, base_station: string, mac_address: string) {
    const alert = await this.alertCtrl.create({
      header: base_station,
      message: 'Enter Password To Delete base Station',
      inputs: [
        {
          name: 'password',
          type: 'password',
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
          text: 'Delete',
          handler: (input_values) => {
            this.apiService.post('delete_base_station',{'base_station_id': id, 'password': input_values['password']})
            .then(response=>{
              console.log(response)
              if(response['error']){
                this.toastService.presentToast(response['error'])
              }else{
                this.cloudApi.post("deactivate_mac_address", {'mac_address': mac_address})
                .then(response=>{
                  this.toastService.presentToast("Base Station Deleted")
                  this.get_base_stations()
                })
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
