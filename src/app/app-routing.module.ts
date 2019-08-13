import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'buy-coins', canActivate: [AuthGuard], loadChildren: './buy-coins/buy-coins.module#BuyCoinsPageModule' },
  { path: 'data-usage', canActivate: [AuthGuard], loadChildren: './data-usage/data-usage.module#DataUsagePageModule' },
  { path: 'deploy/:mac-address', canActivate: [AuthGuard], loadChildren: './deploy/deploy.module#DeployPageModule' },
  { path: 'profile',canActivate: [AuthGuard], loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'edit-profile',canActivate: [AuthGuard], loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'my-base-stations',canActivate: [AuthGuard], loadChildren: './my-base-stations/my-base-stations.module#MyBaseStationsPageModule' },
  { path: 'change-password',canActivate: [AuthGuard], loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'base-stations', canActivate: [AuthGuard], loadChildren: './base-stations/base-stations.module#BaseStationsPageModule' },
  { path: 'overview',canActivate: [AuthGuard], loadChildren: './overview/overview.module#OverviewPageModule' },
  { path: 'deploy-options/:mac-address',canActivate: [AuthGuard], loadChildren: './deploy-options/deploy-options.module#DeployOptionsPageModule' },
  // { path: 'deployments',canActivate: [AuthGuard], loadChildren: './deployments/deployments.module#DeploymentsPageModule' },
  // { path: 'services',canActivate: [AuthGuard], loadChildren: './services/services.module#ServicesPageModule' },
  { path: 'upload-image', loadChildren: './upload-image/upload-image.module#UploadImagePageModule' },
  { path: 'deploy-compose-page/:mac-address',canActivate: [AuthGuard], loadChildren: './deploy-compose-page/deploy-compose-page.module#DeployComposePagePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
