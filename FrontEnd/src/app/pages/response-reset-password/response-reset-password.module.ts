import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponseResetPasswordPageRoutingModule } from './response-reset-password-routing.module';

import { ResponseResetPasswordPage } from './response-reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponseResetPasswordPageRoutingModule
  ],
  declarations: [ResponseResetPasswordPage]
})
export class ResponseResetPasswordPageModule {}
