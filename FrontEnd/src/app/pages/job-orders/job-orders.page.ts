import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { OrdersPage } from '../orders/orders.page';
@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  public apple: boolean = true;
  public item: boolean = true;

  dataFromModal;

  data;
  orders: String = '';
  customerDetails: String = '';
  public dataToPass;

  constructor(private modalController: ModalController, private authService: AuthService, ) { }

  ngOnInit() {
    this.orderData();
  }
  orderData() {
    this.authService.getOrders().subscribe((data: any) => {
      this.orders = data.data;
      console.log(this.orders);
      
    })
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

  async passToOrders(item) {
    console.log(item);
    
    const modal = await this.modalController.create({
      component: OrdersPage,
      componentProps: {
        service_booking: item.service_booking, 
        // name:item.author.name,
        id:item._id,name:item.author.name,schedule: item.schedule,service_location: item.service_location, 
        cost:item.cost,notes: item.notes
      },
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
  

   
    modal.present();
    this.dataFromModal = await modal.onWillDismiss();
  }


}