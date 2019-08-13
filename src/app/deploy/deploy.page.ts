import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { CloudApiService } from '../services/cloud-api/cloud-api.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.page.html',
  styleUrls: ['./deploy.page.scss'],
})
export class DeployPage implements OnInit {

  public images: any;
  public defaultImages: any;

  packages: any;
  image: String;
  imagePrice: String;
  rate: String;
  bandwidth: String;
  package: any;
  packagePrice: String = '0';

  constructor(
    public alertService: AlertService,
    private toastService: ToastService,
    public navCtrl: NavController,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
    public cloudApi: CloudApiService,
    private route: ActivatedRoute,
    private storage: Storage) { }

  ngOnInit() {
    this.cloudApi.get("get_images", {}).then(response=>{
      console.log(response)
      var images_array = []
      for(let image_loop of response){
        image_loop['Name'] = image_loop['image'].split("/",2)[0]
        image_loop['Developer'] = image_loop['image'].split("/",2)[1]
        images_array.push(image_loop)
      }
      this.defaultImages = images_array
      this.images = images_array

    })
  }

  deployApp(image: {}) {
    this.storage.set('image', image)
    console.log(image)
    if(image['compose'] == "1"){
      this.navCtrl.navigateForward(["/deploy-compose-page/"+this.route.snapshot.paramMap.get('mac-address')])
    }else{
      this.navCtrl.navigateForward(["/deploy-options/"+this.route.snapshot.paramMap.get('mac-address')])
    }
  }
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.images = JSON.parse(JSON.stringify(this.defaultImages));

   
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      for (var image in this.images) {
        if (!this.images[image]['image'].includes(val)) {
          this.images.splice(image, 1);
        }
      }
    }
  }


}
