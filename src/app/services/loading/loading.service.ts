import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;
  isCreated = false;
  loading: any;

  constructor(public loadingController: LoadingController) { }

  async present(message: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: message
    })
  }
}