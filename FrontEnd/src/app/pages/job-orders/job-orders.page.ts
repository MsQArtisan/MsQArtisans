import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdersPage } from '../orders/orders.page';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  public imageUrl;
  public valueChosen = ""

  public apple: boolean = true;

  public dataFromModal;
  orders: String = '';
  public customerDetails = [];
  public dataToPass;

  constructor(private modalController: ModalController, private authService: AuthService, ) { }

  ngOnInit() {
    this.orderData();
    this.authService.getUser().subscribe((data) => {
      this.authService.getTheProfileImage({name: data.data[0].name}).subscribe((data) => {
        this.imageUrl = data[0].image[0]
      })
    })
  }
  orderData() {
    this.authService.getCustomersName().subscribe((data) => {
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

  selectedOption(){
    console.log(this.valueChosen)
  }

  async passToOrders(item) {
    if(item.status == "Pending") {
      const modal = await this.modalController.create({
        component: OrdersPage,
        componentProps: {
          status: item.status, id: item._id, name: item.author.name, service_booking: item.service_booking,
          updatedAt: item.updatedAt, service_location: item.service_location,
          cost: item.cost, notes: item.notes
        },
        cssClass: 'setting-modal',
        backdropDismiss: false,
      });
  
      modal.present();
      this.dataFromModal = await modal.onWillDismiss();
      item.status = "onGoing"
    }else {
      Swal.fire('Oopss', "You can't add this because it is already taken by other job hunter", 'warning')
    }
  }

  allData(item){
    let pending = []
    this.authService.getCustomersName().subscribe((data) => {
      if(item != "Pending") {
        this.customerDetails = data.data
      }else {
        data.data.forEach(element => { 
          if(element.status == item) {
            pending.push(element)
          }
        })
        this.customerDetails = pending
      }
    })
  }
}
