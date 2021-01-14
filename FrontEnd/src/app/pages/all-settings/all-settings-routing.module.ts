import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllSettingsPage } from './all-settings.page';

const routes: Routes = [
  {
    path: '',
    component: AllSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSettingsPageRoutingModule {}