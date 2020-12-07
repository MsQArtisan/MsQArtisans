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
  @Input() id : string;
  @Input() name: string;
  @Input() service_booking: string;
  @Input() updatedAt: string;
  @Input() service_location: string;
  @Input() cost: string;
  @Input() notes: string;


  constructor(private router: Router, private modalController: ModalController, private authService: AuthService) { }

  ngOnInit() {
  }

  closeModal() {
     this.modalController.dismiss( 'cancel'); 
    this.router.navigate(['accepted-order/'+this.id]);

   }
  pass(){
    this.modalController.dismiss('cancel');
  }
 
}
