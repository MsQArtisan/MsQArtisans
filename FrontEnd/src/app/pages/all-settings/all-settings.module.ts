import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllSettingsPageRoutingModule } from './all-settings-routing.module';

import { AllSettingsPage } from './all-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSettingsPageRoutingModule
  ],
  declarations: [AllSettingsPage]
})
export class AllSettingsPageModule {}