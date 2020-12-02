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
  customerDetails: String = '';
  public dataToPass;

  constructor(private modalController: ModalController, private authService: AuthService, private storage: Storage, private toastController: ToastController) { }

  ngOnInit() {
    this.orderData();
    this.customerName();



  }
  orderData() {
    this.authService.getOrders().subscribe((data: any) => {
      this.orders = data.data;

    })
  }
  customerName() {
    this.authService.getCustomersName().subscribe((data: any) => {
      this.customerDetails = data.data;

    })
  }

  hideAndShow() {
    if (this.apple) {
      this.apple = false
    } else {
      this.apple = true
    }
  }

  async passToOrders(i) {
    this.dataToPass = this.customerDetails[0]
    console.log("dta To Pass: ", this.dataToPass.service_booking);

    const modal = await this.modalController.create({
      component: OrdersPage,
      componentProps: {
        name:this.dataToPass.author.name,service_booking: this.dataToPass.service_booking, updatedAt: this.dataToPass.updatedAt,
        service_location: this.dataToPass.service_location, cost: this.dataToPass.cost,
        notes: this.dataToPass.notes
      },
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
    

    modal.present();
    this.dataFromModal = await modal.onWillDismiss();
  }





}