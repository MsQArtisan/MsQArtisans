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
  public valueChosen = ""

  public apple: boolean = true;

  public dataFromModal;
  orders: String = '';
  //Initial Jobs 
  public arrayOfJobs = []
  //Final Jobs Array To Display
  public FinalArrayJobs = [];

  filterService: string;
  public dataToPass;

  constructor(private modalController: ModalController, private authService: AuthService, ) { }

  ngOnInit() {
    this.orderData();
  }

  orderData() {
    this.authService.getCustomersName().subscribe((jobs) => {
      
      this.arrayOfJobs = jobs.data;
      this.DisplayFinalJobs();
    })
  }

  //All Final Jobs Of Array
  DisplayFinalJobs() {
    this.authService.checkRejected(this.authService.userIDToken).subscribe((datas) => {
      var jobs=this.arrayOfJobs;
      if (datas.data.length > 0) {
        datas.data.forEach(element => {
          jobs.forEach(reject => {
            if (element.customerId == reject._id) {
              jobs.splice(jobs.indexOf(reject), 1)
            }
          })

        })
        this.FinalArrayJobs = jobs;
      }

      else {
        this.FinalArrayJobs=this.arrayOfJobs;
      }

    })

  }

  //Filtered by JobOrders Category
  FilteredByService(items: any[], searchText: any) {
    if (!searchText.target.value) {
      this.DisplayFinalJobs();
    }
    else {
      if (this.FinalArrayJobs.length > 0) {
        this.FinalArrayJobs = items.filter((filtered) => {
          return filtered.service_booking.toLocaleLowerCase().includes(searchText.target.value.toLocaleLowerCase());
        });
      }
      else {
        this.authService.checkRejected(this.authService.userIDToken).subscribe((datas) => {
          var jobs = this.arrayOfJobs;
          datas.data.forEach(element => {
            jobs.forEach(reject => {
              if (element.customerId == reject._id) {
                jobs.splice(jobs.indexOf(reject), 1)
              }
            })

          })
          this.FinalArrayJobs = jobs.filter((filtered) => {
            return filtered.service_booking.toLocaleLowerCase().includes(this.filterService.toLocaleLowerCase());
          });

        })
      }
    }
  }

  hideAndShow() {
    if (this.apple) {
      this.apple = false
    } else {
      this.apple = true
    }
  }

  selectedOption() {
    // console.log(this.valueChosen)
  }

  async passToOrders(item) {
    document.getElementById(item._id).style.display = 'none'
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
  }
  
}