import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accepted-order',
  templateUrl: './accepted-order.page.html',
  styleUrls: ['./accepted-order.page.scss'],
})
export class AcceptedOrderPage implements OnInit {

  jobTitle= "Massage";
  schedule= "Nov.10,2020 - 12:00pm - 5:00pm";
  location= "Nasipit Rd, Talamban Cebu";
  rate= "4000 Pesos";
  notes="Looking for a nanny for my 3 years old baby boy.";
  constructor() { }

  ngOnInit() {
  }

}
