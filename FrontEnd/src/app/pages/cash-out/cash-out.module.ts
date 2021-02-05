import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashOutPageRoutingModule } from './cash-out-routing.module';

import { CashOutPage } from './cash-out.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashOutPageRoutingModule
  ],
  declarations: [CashOutPage]
})
export class CashOutPageModule {}
