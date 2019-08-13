import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyBaseStationsPage } from './my-base-stations.page';

const routes: Routes = [
  {
    path: '',
    component: MyBaseStationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyBaseStationsPage]
})
export class MyBaseStationsPageModule {}
