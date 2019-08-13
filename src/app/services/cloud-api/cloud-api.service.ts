import { Injectable } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertService } from '../alert/alert.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CloudApiService {
  public cloudApiIP: string = "http://156.38.174.66:8080/";

  constructor(public loadingController: LoadingController,private storage: Storage, private http: HTTP, public loadingService: LoadingService, public alertService: AlertService) {
    
   }

  public async post(method: string, values: {}){
    var loader = await this.loadingController.create({message:"Loading..."})
    loader.present()
    var token_key = await this.storage.get("auth-token")
    values['method'] = method
    values = Object.assign({}, values, token_key)
    values['type'] = 'deploy'
    var http_response =  await this.http.post(this.cloudApiIP, values, {}).catch(error =>{
      console.log(error)
      this.alertService.presentAlert("Error", "Internal Server Error", "Please Try Again Or Contact Admin")
      return;
     }).finally(()=>{loader.dismiss()})
    if(http_response['data'] == 'Error 500: Please Check Request'){
      throw "Internal Server Error"
    }
    var http_data = JSON.parse(http_response['data'])
    return http_data
  }

  public async get(method: string, values: {}){
    var loader = await this.loadingController.create({message:"Loading..."})
    loader.present()
    var token_key = await this.storage.get("auth-token")
    values['method'] = method
    values = Object.assign({}, values, token_key)
    values['type'] = 'deploy'
    var http_response =  await this.http.get(this.cloudApiIP, values, {}).catch(error =>{
      console.log(error)
      this.alertService.presentAlert("Error", "Internal Server Error", "Please Try Again Or Contact Admin")
      return;
     }).finally(()=>{loader.dismiss()})
    if(http_response['data'] == 'Error 500: Please Check Request'){
      throw "Internal Server Error"
    }
    var http_data = JSON.parse(http_response['data'])
    return http_data
  }
}
