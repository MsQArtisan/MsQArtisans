import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdersPage } from '../orders/orders.page'
import { FunctionsToUse } from '../../functions/functions.model'


@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  //Initial Jobs 
  public arrayOfJobs = []
  public functions = new FunctionsToUse()
  public imageUrl;
  public valueChosen = ""

  public apple: boolean = true;

  public dataFromModal;
  orders: String = '';

 //Final Jobs Array To Display
  public FinalArrayJobs = [];

  //BackUp For FinalArrayJobs
  public backupFilterJobs=[];

  public dataToPass;
  public id: string;
  constructor(private modalController: ModalController, private authService: AuthService,) { 
  }

  ngOnInit() {
    this.orderData();

  }

  hideCard(itemId){
    console.log(itemId)
  }

  orderData(){
    this.authService.getCustomersName().subscribe((jobs) => {
      this.arrayOfJobs=jobs.data;
      this.authService.checkRejected(this.authService.userIDToken).subscribe((datas)=> {
         var jobs=[];
         jobs=this.arrayOfJobs;
        if (datas.data.length>0) {
          datas.data.forEach(element=>{
            jobs.forEach(reject=>{
              if (element.customerId==reject._id){
                 jobs.splice(jobs.indexOf(reject),1)
              }
            })

          })
          jobs.forEach(filter=>{
             this.FinalArrayJobs.push(filter);
             this.backupFilterJobs.push(filter);
          })
        }

        else {
          this.FinalArrayJobs=this.arrayOfJobs;
        }
  
      })

    })
  }



  //Filtered by Job Orders Category
  FilteredByService(items:any[],searchText:any){
   
    if (!items) {
      return this.FinalArrayJobs=[];
    }

    if (!searchText.target.value){
    this.FinalArrayJobs=this.backupFilterJobs;
    }

    this.FinalArrayJobs=items.filter((filtered) => {
      return filtered.service_booking.toLocaleLowerCase().includes(searchText.target.value.toLocaleLowerCase());
    });
    // if (searchText.target.value && searchText.target.value.trim() != '') {
    //   this.FinalArrayJobs=items.filter((item) => {
    //     return (item.service_booking.toLocaleLowerCase().indexOf(searchText.target.value.toLowerCase()) > -1);
    //   })
    // }

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
