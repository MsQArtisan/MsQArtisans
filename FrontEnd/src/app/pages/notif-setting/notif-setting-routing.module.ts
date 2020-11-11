import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifSettingPage } from './notif-setting.page';

const routes: Routes = [
  {
    path: '',
    component: NotifSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifSettingPageRoutingModule {}
