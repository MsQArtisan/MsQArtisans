import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service' 
import { Router } from "@angular/router";

@Component({
  selector: 'app-accepted-order',
  templateUrl: './accepted-order.page.html',
  styleUrls: ['./accepted-order.page.scss'],
})
export class AcceptedOrderPage implements OnInit {
  public jobOffer = {
    name: "Jessa Mae Yosores",
    phone: "09326514567",
    email: "jess@gmail.com",
    jobTitle: "Massage",
    schedule: "Nov.10,2020 - 12:00pm - 5:00pm",
    location: "Nasipit Rd, Talamban Cebu",
    rate: "4000 Pesos",
    notes: "Looking for a nanny for my 3 years old baby boy."
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addDataToDatabase(){
    this.authService.addDataToJobOrders({state: "accept", jobOffer: this.jobOffer}).subscribe((data) => {
      if(data) {
        this.router.navigate(['tracker']);
      }
    })
  }
  cancel(){
    this.router.navigate(['job-orders'])
  }


}
