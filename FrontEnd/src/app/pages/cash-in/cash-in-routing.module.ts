import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashInPage } from './cash-in.page';

const routes: Routes = [
  {
    path: '',
    component: CashInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashInPageRoutingModule {}
