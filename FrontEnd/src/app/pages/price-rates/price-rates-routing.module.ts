import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceRatesPage } from './price-rates.page';

const routes: Routes = [
  {
    path: '',
    component: PriceRatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceRatesPageRoutingModule {}
