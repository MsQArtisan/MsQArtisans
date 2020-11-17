import { Component,Input, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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


  constructor(private router: Router,public navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() { 
     this.modalController.dismiss( 'cancel'); 
    this.router.navigate(['accepted-order'])
   }

 
}
