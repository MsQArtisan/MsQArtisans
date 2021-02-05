import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashInPageRoutingModule } from './cash-in-routing.module';

import { CashInPage } from './cash-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashInPageRoutingModule
  ],
  declarations: [CashInPage]
})
export class CashInPageModule {}
