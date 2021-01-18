import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdersPage } from '../orders/orders.page'
import { FunctionsToUse } from '../../functions/functions.model'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  public arrayOfJobs = []
  public functions = new FunctionsToUse()
  public imageUrl;
  public valueChosen = ""

  public apple: boolean = true;

  public dataFromModal;
  orders: String = '';
  public customerDetails = [];

  public FinalArrayJobs = [];

  //BackUp For FinalArrayJobs
  public backupFilterJobs=[];

  public dataToPass;
  public id: string;
  constructor(private modalController: ModalController, private authService: AuthService,) { }

  ngOnInit() {
    console.log("userid:"+this.authService.userIDToken)
    this.orderData();
    this.arrayOfJobs=this.customerDetails;
    //this.checkRejected();
    this.authService.getUser().subscribe((data) => {
      this.authService.getTheProfileImage({ name: data.data[0].name }).subscribe((data) => {
        this.imageUrl = data[0].image[0]
      })
    })

  }


  orderData() {

    this.authService.getCustomersName().subscribe((data) => {
      data.data.forEach(element => {
        if (element.status == 'Pending') {
          this.customerDetails.push(element);
        }
      })

      this.authService.checkRejected(this.authService.userIDToken).subscribe((datas) => {
         var arrays=[];
         var jobs=[];
         jobs=this.arrayOfJobs;
         arrays=datas.data;
         console.log("LengthRejected:" + arrays.length)
        if (arrays.length > 0) {
          console.log("Greater than zero")
          arrays.forEach(element=>{
            jobs.forEach(reject=>{
              if (element.customerId==reject._id){
                 jobs.splice(jobs.indexOf(reject),1)
              }
            })

          })
          console.log("Jobs:"+jobs.length)
          jobs.forEach(filter=>{
             this.FinalArrayJobs.push(filter);
             this.backupFilterJobs.push(filter);
          })
         // this.FinalArrayJobs=jobs;
          //this.backupFilterJobs=jobs;
        }

        else {
          this.FinalArrayJobs=this.arrayOfJobs;
          console.log("Equals Zero:" + this.FinalArrayJobs.length)
        }
  
      })

    })
  }



  //Filtered by Job Orders Category
  FilteredByService(items: any[], searchText: any): any[] {

    this.FinalArrayJobs = items.filter((filtered) => {
      return filtered.service_booking.toLocaleLowerCase().includes(searchText.target.value.toLocaleLowerCase());
    });

    if (!items) {
      return this.FinalArrayJobs =[];
    }

    if (!searchText.target.value){
      return this.FinalArrayJobs=this.backupFilterJobs;
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
    console.log(this.valueChosen)
  }


  async passToOrders(item) {
    // if(item.status == "Pending") {
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
    // item.status = "onGoing"
    // }`
    // else{
    //   Swal.fire('Oopss', "You can't add this because it is already taken by other job hunter", 'warning')
    // }
  }



  // allData(item){
  //   let pending = []
  //   this.authService.getCustomersName().subscribe((data) => {
  //     if(item !="Pending") {
  //       this.customerDetails = data.data
  //     }else {
  //       data.data.forEach(element => { 
  //         if(element.status == item) {
  //           pending.push(element)
  //         }
  //       })
  //       this.customerDetails = pending
  //     }
  //   })
  // }


  hideCard(data) {
    document.getElementById(data).style.display = "none"
  }

}
