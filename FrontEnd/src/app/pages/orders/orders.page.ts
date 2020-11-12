import { Component,Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  @Input() jobTitle: string;
  @Input() schedule: string;
  @Input() location: string;
  @Input() rate: string;
  @Input() notes: string;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() { 
    // data null and role cancel
     this.modalController.dismiss( 'cancel'); 
   }

}
