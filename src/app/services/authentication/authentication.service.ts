import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(()=>{
      this.checkToken();
    })
  }

  async checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  async login(token: {}) {
    if(token){
      return this.storage.set(TOKEN_KEY, token).then(() => {
        this.authenticationState.next(true);
      });
    }
  }

  async update_token(token: {}) {
    return this.storage.set(TOKEN_KEY, token)
  }

  async logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
