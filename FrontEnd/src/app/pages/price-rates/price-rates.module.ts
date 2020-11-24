import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceRatesPageRoutingModule } from './price-rates-routing.module';

import { PriceRatesPage } from './price-rates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceRatesPageRoutingModule
  ],
  declarations: [PriceRatesPage]
})
export class PriceRatesPageModule {}
