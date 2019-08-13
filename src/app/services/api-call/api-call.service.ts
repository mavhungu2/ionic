import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertService } from '../alert/alert.service';
import { LoadingService } from '../loading/loading.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from '../toast/toast.service';
import { load } from '@angular/core/src/render3';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  public usersAppIP: string = "http://156.38.174.66:5002/";
  time_out_timer: any;

  constructor(public loadingController: LoadingController, private storage: Storage,private http: HTTP,public alertService: AlertService, public loadingService: LoadingService, private authService: AuthenticationService, public alertCtrl: AlertController, public toastService: ToastService) { }

  public logOut(){
    clearTimeout(this.time_out_timer)
  }

  public async post(method: string, values: {}){
    var loader = await this.loadingController.create({message:"Loading..."})
    loader.present()
    var token_key = await this.storage.get(TOKEN_KEY)
    values['method'] = method
    values = Object.assign({}, values, token_key)
    var http_response =  await this.http.post(this.usersAppIP, values, {}).catch(error =>{
      console.log(error)
      this.alertService.presentAlert("Error", "Internal Server Error", "Please Try Again Or Contact Admin")
      return;
     }).finally(()=>{loader.dismiss()})
    if(http_response['data'] == 'Error 500: Please Check Request'){
      this.alertService.presentAlert("Error", "Internal Server Error", "Please Try Again Or Contact Admin")
      throw "Internal Server Error"
    }
    var http_data = JSON.parse(http_response['data'])
    if(http_data['uid']){
      http_data['user_id'] = http_data['uid']
    }
    if (http_data['token']) {
      if(typeof http_data['token'] == 'object'){
        if(values['token']){
          if(values['reset_token']){
            this.token_expired(http_data['token']['token'], http_data['token']['token'])  
          }else{
            this.token_expired(values['token'], http_data['token']['token'])
          }
        }else{
          this.token_expired(http_data['token']['token'], http_data['token']['token'])
        }
        http_data['token']['user_id'] = values['user_id']
        http_data['token']['type'] = values['type']
        if(values['namespace']){
          http_data['token']['namespace'] = values['namespace']
          http_data['token']['username'] = values['namespace']
        }
        http_data['token']['namespace'] = values['username']
        http_data['token']['username'] = values['username']
        if(this.authService.isAuthenticated()){
          this.authService.update_token(http_data['token'])
        }else{
          this.authService.login(http_data['token'])
        }
      }else{
        if(values['token']){
          if(values['reset_token']){
            this.token_expired(http_data['token'], http_data['token'])
          }else{
            this.token_expired(values['token'], http_data['token'])
          }
        }else{
          this.token_expired(http_data['token'], http_data['token'])
        }
        if(values['namespace']){
          http_data['namespace'] = values['namespace']
          http_data['username'] = values['namespace']
        }
        if(values['user_id']){
          http_data['user_id'] = values['user_id']
          http_data['type'] = values['type']
        }
        if(this.authService.isAuthenticated()){
          this.authService.update_token(http_data)
        }else{
          http_data['namespace'] = values['username']
          http_data['username'] = values['username']
          this.authService.login(http_data)
        }
      }
    }
    return http_data
  }
  

  async token_expired(old_token: string, token : string){
    let token_created = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))['created']
    let old_token_created = JSON.parse(atob(old_token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))['created']
    let current_token_time = new Date(token_created).getTime()
    let old_token_time = new Date(old_token_created).getTime()
    let time_difference = ((old_token_time-current_token_time))+300000
    clearTimeout(this.time_out_timer)
    this.time_out_timer = setTimeout(() => {
      this.show_alert(30)
    }, time_difference-30000);
  }

  async show_alert(time_difference: number) {
    const myAlert = await this.alertCtrl.create({
      header: 'Confirm Password',
      subHeader: 'Your Session Is About To Expire in '+time_difference+' Seconds',
      message: 'Enter Your Log In Password To Continue',
      backdropDismiss: false,
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
          text: 'Log Out',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            clearInterval(countDownInerval)
            this.authService.logout()
          }
        }, {
          text: 'Re-Login',
          handler: (input_values) => {
            if(input_values['password']){
              this.post("login", {'password': input_values['password'], 'reset_token': true})
              .then(response=>{
                if(response['error']){
                  this.toastService.presentToast("Incorrect Password")
                  clearInterval(countDownInerval)
                  this.show_alert(time_difference)
                }
                if(response['token']){
                  clearInterval(countDownInerval)
                  myAlert.dismiss()
                  this.toastService.presentToast("Welcome Back "+response['username'])
                }
              })
            }else{
              this.toastService.presentToast("Enter Password To Re-Login")
              return false;
            }
          }
        }
      ]
    });

    await myAlert.present();
    var countDownInerval = setInterval(()=>{
      time_difference = time_difference-1;
      if(time_difference<1){
        clearInterval(countDownInerval);
        this.authService.logout()
        myAlert.dismiss()
      }
      myAlert['subHeader'] = 'Your Session Is About To Expire in ' + time_difference + ' Seconds'
    }, 1000)
  }


  public async get(method: string, values: {}){
    var loader = await this.loadingController.create({message:"Loading..."})
    loader.present()
    var token_key = await this.storage.get(TOKEN_KEY)
    values['method'] = method
    values = Object.assign({}, values, token_key)
    var http_response =  await this.http.get(this.usersAppIP, values, {}).catch(error =>{
      console.log(error)
      this.alertService.presentAlert("Error", "Internal Server Error", "Please Try Again Or Contact Admin")
      return;
     }).finally(()=>{loader.dismiss()})
    if(http_response['data'] == 'Error 500: Please Check Request'){
      this.alertService.presentAlert("Error", "Internal Server Error", "Please Try Again Or Contact Admin")
      throw "Internal Server Error"
    }
    var http_data = JSON.parse(http_response['data'])
    if(http_data['uid']){
      http_data['user_id'] = http_data['uid']
    }
    if (http_data['token']) {
      if(typeof http_data['token'] == 'object'){
        if(values['token']){
          if(values['reset_token']){
            this.token_expired(http_data['token']['token'], http_data['token']['token'])  
          }else{
            this.token_expired(values['token'], http_data['token']['token'])
          }
        }else{
          this.token_expired(http_data['token']['token'], http_data['token']['token'])
        }
        http_data['token']['user_id'] = values['user_id']
        http_data['token']['type'] = values['type']
        if(values['namespace']){
          http_data['token']['namespace'] = values['namespace']
          http_data['token']['username'] = values['namespace']
        }
        http_data['token']['namespace'] = values['username']
        http_data['token']['username'] = values['username']
        if(this.authService.isAuthenticated()){
          this.authService.update_token(http_data['token'])
        }else{
          this.authService.login(http_data['token'])
        }
      }else{
        if(values['token']){
          if(values['reset_token']){
            this.token_expired(http_data['token'], http_data['token'])
          }else{
            this.token_expired(values['token'], http_data['token'])
          }
        }else{
          this.token_expired(http_data['token'], http_data['token'])
        }
        if(values['namespace']){
          http_data['namespace'] = values['namespace']
          http_data['username'] = values['namespace']
        }
        if(values['user_id']){
          http_data['user_id'] = values['user_id']
          http_data['type'] = values['type']
        }
        if(this.authService.isAuthenticated()){
          this.authService.update_token(http_data)
        }else{
          http_data['namespace'] = values['username']
          http_data['username'] = values['username']
          this.authService.login(http_data)
        }
      }
    }
    return http_data
  }


} 
          
      
   