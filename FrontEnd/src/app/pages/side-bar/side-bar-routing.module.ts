import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideBarPage } from './side-bar.page';

const routes: Routes = [
  {
    path: '',
    component: SideBarPage,
    children:[
      {
        path: 'job-orders',
        loadChildren: () => import('../job-orders/job-orders.module').then(m => m.JobOrdersPageModule)
      },
      {
        path: 'finance',
        loadChildren: () => import('../finance/finance.module').then(m => m.FinancePageModule)
      },
      {
        path: 'tracker',
        loadChildren: () => import('../tracker/tracker.module').then(m => m.TrackerPageModule)
      },
      {
        path: 'livechat',
        loadChildren: () => import('../livechat/livechat.module').then(m => m.LivechatPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'all-settings',
        loadChildren: () => import('../all-settings/all-settings.module').then( m => m.AllSettingsPageModule)
      },
      {
        path: 'acc-info',
        loadChildren: () => import('../acc-info/acc-info.module').then(m => m.AccInfoPageModule)
      },
      {
        path: 'location-select/:location',
        loadChildren: () => import('../location-select/location-select.module').then(m => m.LocationSelectPageModule)
      },
      {
        path: 'accepted-order/:id',
        loadChildren: () => import('../accepted-order/accepted-order.module').then( m => m.AcceptedOrderPageModule)
      }, {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'user-ratings',
        loadChildren: () => import('../user-ratings/user-ratings.module').then( m => m.UserRatingsPageModule)
      },
      {
        path: 'suki',
        loadChildren: () => import('../suki/suki.module').then( m => m.SukiPageModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('../privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
      },
      {
        path: 'terms-conditions',
        loadChildren: () => import('../terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
      },
      {
        path: 'price-rates',
        loadChildren: () => import('../price-rates/price-rates.module').then( m => m.PriceRatesPageModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)
      },
      {
        path: 'cash-out',
        loadChildren: () => import('../cash-out/cash-out.module').then( m => m.CashOutPageModule)
      },
      {
        path: 'cash-in',
        loadChildren: () => import('../cash-in/cash-in.module').then( m => m.CashInPageModule)
      },  
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then( m => m.HistoryPageModule)
      },
      
      {
        path:'',
        redirectTo:'/job-orders'
      },
        
    ]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideBarPageRoutingModule {}
