import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string) {
    await this.toastController.create({
      showCloseButton: true,
      position: 'bottom',
      duration: 10000,
      message: message
    }).then(a =>{
      a.present();
    });
  }
}
