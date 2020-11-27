import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OrdersPage } from '../orders/orders.page';
@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  public apple: boolean = true;

  dataFromModal;

  data;
  orders: String = '';
  public dataToPass ;
  
  constructor(private modalController: ModalController, private authService: AuthService, private storage: Storage, private toastController: ToastController) { }

  ngOnInit() {
    this.orderData();

  }
  orderData() {
    this.authService.getOrders().subscribe((data: any) => {
       this.orders = data.data;
      console.log(this.orders[0])
    })
  }

  hideAndShow() {
    if (this.apple) {
      this.apple = false
    } else {
      this.apple = true
    }
  }

  async passToOrders(i){
    this.dataToPass = this.orders[i]
    const modal = await this.modalController.create({
      component: OrdersPage,
      componentProps: { id: this.dataToPass._id, name: this.dataToPass.name,jobTitle: this.dataToPass.jobTitle,schedule: this.dataToPass.schedule, location:this.dataToPass.location, rate: this.dataToPass.rate , notes: this.dataToPass.notes},
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
    modal.present();
    this.dataFromModal = await modal.onWillDismiss();
  }


}