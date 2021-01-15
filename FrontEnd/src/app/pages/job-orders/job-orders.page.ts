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
  public customerDetails =[];
  public dataToPass;
  public id:string;
  constructor(private modalController: ModalController, private authService: AuthService, ) { }

  ngOnInit() {
  
    this.orderData();
    this.checkRejected();
    
    this.authService.getUser().subscribe((data) => {
      this.authService.getTheProfileImage({name: data.data[0].name}).subscribe((data) => {
        this.imageUrl = data[0].image[0]
      })
    })
    
  }

  

  orderData() {
    this.authService.getCustomersName().subscribe((data) => {
      data.data.forEach(element => {
         if(element.status=='Pending'){
          this.customerDetails.push(element);
         }
    })
    this.arrayOfJobs=this.customerDetails;
    })
    
  
  }

  checkRejected(){
    //this.authService.checkRejected(this.authService.userIDToken).subscribe((datas) => {
      //console.log("LengthRejected:"+datas.data.length)
      //this.arrayOfJobs=this.customerDetails;
     // console.log("ArrayJobsLength:"+this.arrayOfJobs.length)
      // var unique = datas.data.filter((v, i, a) => a.indexOf(v) === i);

      // console.log(unique); 

      // if(datas.data.length==0){
      //   this.arrayOfJobs=this.customerDetails;
      //   console.log("ArrayJobsLength:"+this.arrayOfJobs.length)
      // }

      // else{
      //     //console.log(console.log(this.customerDetails[i].status))
      //       // for (var i = 0;i<this.customerDetails.length; i++) {
      //       //   for (var x= 0;x<datas.data.length; x++) {
      //       //          if(this.customerDetails[i]._id!=datas.data[x].customerId){
      //       //              this.arrayOfJobs.push(this.customerDetails[i])
      //       //          }
      //       //    }
      //       // }
      //       console.log("It has a rejected!")
      // }

  //  })
  this.functions.checkRejectedTask(this.authService,{user:this.authService.userIDToken},this.arrayOfJobs)
  }
  
//Filtered by Job Orders Category
FilteredByService(items: any[], searchText:any): any[] {
    if(!items) {
     return this.arrayOfJobs=[];
    }

    if (!searchText.target.value) {
         return this.arrayOfJobs=items;
    }
    
    this.arrayOfJobs = items.filter((filtered) => {
      return filtered.service_booking.toLocaleLowerCase().includes(searchText.target.value.toLocaleLowerCase());
    });

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
