import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forget-pass',
    loadChildren: () => import('./pages/forget-pass/forget-pass.module').then( m => m.ForgetPassPageModule)
  },
  {
    path: 'job-orders',
    loadChildren: () => import('./pages/job-orders/job-orders.module').then( m => m.JobOrdersPageModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./pages/finance/finance.module').then( m => m.FinancePageModule)
  },
  {
    path: 'tracker',
    loadChildren: () => import('./pages/tracker/tracker.module').then( m => m.TrackerPageModule)
  },
  {
    path: 'livechat',
    loadChildren: () => import('./pages/livechat/livechat.module').then( m => m.LivechatPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'notif-setting',
    loadChildren: () => import('./pages/notif-setting/notif-setting.module').then( m => m.NotifSettingPageModule)
  },
  {
    path: 'acc-info',
    loadChildren: () => import('./pages/acc-info/acc-info.module').then( m => m.AccInfoPageModule)
  },
  {
    path: 'location-select',
    loadChildren: () => import('./pages/location-select/location-select.module').then( m => m.LocationSelectPageModule)
  },
  {
    path: 'accepted-order',
    loadChildren: () => import('./pages/accepted-order/accepted-order.module').then( m => m.AcceptedOrderPageModule)
  }, {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },


];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
