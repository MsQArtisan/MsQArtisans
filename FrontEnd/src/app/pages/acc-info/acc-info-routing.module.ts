import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccInfoPage } from './acc-info.page';

const routes: Routes = [
  {
    path: '',
    component: AccInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccInfoPageRoutingModule {}
