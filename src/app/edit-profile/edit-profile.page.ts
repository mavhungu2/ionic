import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { ApiCallService } from '../services/api-call/api-call.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public profileForm: FormGroup;
  name: String;
  surname: String;
  address: String;
  account: String;
  email: String;
  tel: String;

  constructor(private formBuilder: FormBuilder,
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    public apiService: ApiCallService,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController) {
      
      this.profileForm = this.formBuilder.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        address: ['', Validators.required],
        account: ['', Validators.required],
        contact: ['', Validators.required],
      });

      this.apiService.get("get_user", {})
      .then(response =>{
        this.profileForm.setValue({
          email: response['result'][0],
          name: response['result'][1],
          surname: response['result'][2],
          address: response['result'][5],
          account: response['result'][4],
          contact: response['result'][3],
        })
        console.log(response['result'])
      })

      


    }

  ngOnInit() {
  }

  async edit_user() {
    const myAlert = await this.alertCtrl.create({
      header: 'Confirm Password',
      message: 'Please Confirm Password To Update Profile',
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
            if(input_values['password']){
              this.profileForm.value['password'] = input_values['password']
              this.apiService.post("update_user", this.profileForm.value)
              .then(response=>{
                myAlert.dismiss()
                console.log(response)
                if(response['error']){
                  this.alertService.presentAlert("Error", "Check Details", "Failed To Update Profile. Please Check Your Details")
                }
                if(response['message']){
                  this.toastService.presentToast(response['message'])
                  this.profileForm.markAsPristine()
                }
              })
              
            }else{
              this.alertService.presentAlert("Password", "", "You Must Enter Password To Save Your Changes")
            }
          }
        }
      ]
    });

    await myAlert.present();
  }
}
