import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponseResetPasswordPage } from './response-reset-password.page';

const routes: Routes = [
  {
    path: '',
    component: ResponseResetPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponseResetPasswordPageRoutingModule {}
