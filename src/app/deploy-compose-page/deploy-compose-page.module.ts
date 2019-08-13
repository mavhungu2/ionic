import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeployComposePagePage } from './deploy-compose-page.page';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: DeployComposePagePage
  }
];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeployComposePagePage]
})
export class DeployComposePagePageModule {}
