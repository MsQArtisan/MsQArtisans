import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifSettingsPageRoutingModule } from './notif-settings-routing.module';

import { NotifSettingsPage } from './notif-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifSettingsPageRoutingModule
  ],
  declarations: [NotifSettingsPage]
})
export class NotifSettingsPageModule {}
