import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {OrdersPage } from '../orders/orders.page';
@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  public apple:boolean=true;
 
  dataFromModal;

  data;
  jobTitle= "Massage";
  schedule= "Nov.10,2020 - 12:00pm - 5:00pm";
  location= "Nasipit Rd, Talamban Cebu";
  rate= "4000 Pesos";
  notes="Looking for a nanny for my 3 years old baby boy.";

  
  show = false;
  constructor(private modalController: ModalController,private authService: AuthService, private storage: Storage, private toastController: ToastController) { }

  ngOnInit() {
    
  }


  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res['msg'];
    });
  }
  
  async order() {
    const modal = await this.modalController.create({
      component: OrdersPage,
      componentProps: { jobTitle: this.jobTitle,schedule: this.schedule, location:this.location, rate: this.rate , notes: this.notes},
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });

    modal.present();
    this.dataFromModal = await modal.onWillDismiss();
  }

  hideAndShow() {
    if(this.apple) {
      this.apple = false
    }else {
      this.apple = true
    }
  }
 
 
}