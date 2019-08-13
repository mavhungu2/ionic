import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OverviewPage } from './overview.page';

const routes: Routes = [
  {
    path: '',
    component: OverviewPage,
    children:[
      {
        path: 'services',
        loadChildren: '../services/services.module#ServicesPageModule'
  
      },{
        path: 'deployments',
        loadChildren: '../deployments/deployments.module#DeploymentsPageModule'
      }
    ]  

  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OverviewPage]
})
export class OverviewPageModule {}
