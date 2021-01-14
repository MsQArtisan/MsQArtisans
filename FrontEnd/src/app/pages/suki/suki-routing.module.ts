import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SukiPage } from './suki.page';

const routes: Routes = [
  {
    path: '',
    component: SukiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SukiPageRoutingModule {}
