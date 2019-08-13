import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { CloudApiService } from '../services/cloud-api/cloud-api.service';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.page.html',
  styleUrls: ['./deployments.page.scss'],
})
export class DeploymentsPage implements OnInit {
  deployments: {};
  constructor(
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public cloudApi: CloudApiService,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public apiService: ApiCallService) { }

  ngOnInit() {
    this.cloudApi.get("get_deployments", {})
    .then(response=>{
      for(let deployment of response){
        deployment['containerPort'] = []
        deployment['containerPortProtocol'] = []
        for(let port of deployment["state"]['Info']['template']['spec']['containers'][0]['ports']){
          deployment['containerPort'].push(port['containerPort'] + " | " + port['protocol'])
        }  
      }
      this.deployments = response
    })
    
  }

  async deleteDeployment(deployment: string) {
    const alert = await this.alertController.create({
      header: deployment,
      message: 'Are you sure you want to delete this deployment?',
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
            this.delete_deployment(deployment)
          }
        }
      ]
    });

    await alert.present();
  }

  delete_deployment(deployment: string){
    this.cloudApi.post('delete_deployment', {'name':deployment, 'mac_address': this.route.snapshot.paramMap.get('mac-address')})
    .then(response=>{
      this.toastService.presentToast(response['result'])
    })
  }

  update_deployment(deployment: string, port: string, replicas: string){
    this.cloudApi.post('update_deployment', {'name':deployment, 'replicas': replicas, 'port': port, 'mac_address': this.route.snapshot.paramMap.get('mac-address')})
  }

  async editDeployment(deployment: string, port:string, replicas:string) {
      const alert = await this.alertController.create({
        header: deployment,
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
            }
          }, {
            text: 'Update Deployment',
            handler: (input_values) => {
              this.update_deployment(deployment, port, replicas)
            }
          }
        ]
      });
  
      await alert.present();
    }
}


