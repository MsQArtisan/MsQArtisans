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
  public ToPush = {
    jobTitle: "",
    schedule: "",
    location: "",
    rate: "",
    notes: ""
  };

  @Input() jobTitle: string;
  @Input() schedule: string;
  @Input() location: string;
  @Input() rate: string;
  @Input() notes: string;


  constructor(private router: Router,public navCtrl: NavController, private modalController: ModalController, private authService: AuthService) { }

  ngOnInit() {
  }

  closeModal() {
     this.modalController.dismiss( 'cancel'); 
    this.router.navigate(['accepted-order'])
   }
  pass(){
    this.modalController.dismiss('cancel');
  }
 
}
