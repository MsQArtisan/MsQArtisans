import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SukiPageRoutingModule } from './suki-routing.module';

import { SukiPage } from './suki.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SukiPageRoutingModule
  ],
  declarations: [SukiPage]
})
export class SukiPageModule {}
