import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';

const routes: Routes = [
  {
    path: 'response-reset-password/:token',
    component: ResponseResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
