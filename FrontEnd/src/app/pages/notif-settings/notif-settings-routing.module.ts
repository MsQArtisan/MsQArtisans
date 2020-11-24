import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifSettingsPage } from './notif-settings.page';

const routes: Routes = [
  {
    path: '',
    component: NotifSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifSettingsPageRoutingModule {}
