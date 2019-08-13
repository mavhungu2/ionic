import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { CloudApiService } from '../services/cloud-api/cloud-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services: {};
  constructor(
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public cloudApi: CloudApiService,
    public alertController: AlertController,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.cloudApi.get("get_services", {})
    .then(response=>{
      console.log(response)
      for(let service of response){
        service['containerPort'] = []
        service['containerPortProtocol'] = []
        for(let port of service["state"]['Info']['ports']){
          service['containerPort'].push(port['name'] + " | "+port['nodePort'] +" | "+ port['protocol'])
        }  
      }
      this.services = response
    })
  }

  async delete_service_prompt(service: string) {
    const alert = await this.alertController.create({
      header: service,
      message: 'Are you sure you want to delete this service?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
        
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.delete_service(service)
          }
        }
      ]
    });

    await alert.present();
  }

  delete_service(service: string){
    this.cloudApi.post('delete_service', {'name':service, 'mac_address': this.route.snapshot.paramMap.get('mac-address')})
    .then(response=>{
      console.log(response)
      this.toastService.presentToast(response['result'])
    })
  }

  update_service(service: string, port: string, replicas: string){
    this.cloudApi.post('update_service', {'name':service, 'replicas': replicas, 'port': port, 'mac_address': this.route.snapshot.paramMap.get('mac-address')})
  }

  async edit_service_prompt(service: string, port:string, replicas:string) {
      const alert = await this.alertController.create({
        header: service,
        inputs: [
          {
            name: 'Port',
            type: 'number',
            placeholder: 'Current Port'+port,
            min: 0
          },
          {
            name: 'Replicas',
            type: 'number',
            id: 'replicas',
            value: 0,
            min: 0,
            placeholder: 'Current Replicas'+replicas
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Update service',
            handler: (input_values) => {
              this.update_service(service, port, replicas)
            }
          }
        ]
      });
  
      await alert.present();
    }
}


