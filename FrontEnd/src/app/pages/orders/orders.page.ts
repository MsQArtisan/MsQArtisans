import { Component,Input, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  public jobOffer;
  @Input() id : string;
  @Input() name: string;
  @Input() service_booking: string;
  @Input() updatedAt: string;
  @Input() service_location: string;
  @Input() cost: string;
  @Input() notes: string;
  @Input() status:string;
  
  constructor(private router: Router, private modalController: ModalController, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCustomersData(this.id).subscribe((data) => {
      this.jobOffer = data
    })
  }

  closeModal() {
     this.modalController.dismiss( 'cancel'); 
     this.jobOffer.status = "onGoing"
    this.router.navigate(['accepted-order/'+this.id]);

   }
   
  pass(){
    location.reload()
  }
 
}
