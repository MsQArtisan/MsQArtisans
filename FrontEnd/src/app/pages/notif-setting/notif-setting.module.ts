import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifSettingPageRoutingModule } from './notif-setting-routing.module';

import { NotifSettingPage } from './notif-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifSettingPageRoutingModule
  ],
  declarations: [NotifSettingPage]
})
export class NotifSettingPageModule {}
