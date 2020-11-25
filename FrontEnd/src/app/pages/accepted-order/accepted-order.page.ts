import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-accepted-order',
  templateUrl: './accepted-order.page.html',
  styleUrls: ['./accepted-order.page.scss'],
})
export class AcceptedOrderPage implements OnInit {
  constructor(
    private authService: AuthService
  ) { }
  info = [
    {
      customer : "Yubert Mariscal",
      phone :"09326514567",
      email :"yu@gmail.com",
      jobTitle :"Massage",
      schedule :"Nov.10,2020 - 12:00pm - 5:00pm",
      location :"Nasipit Rd, Talamban Cebu",
      rate :"4000 Pesos",
      notes :"Looking for a nanny for my 3 years old baby boy."
    
    },
  ];

  pushDataToDatabase() {
    this.authService.dataToDB(this.info).subscribe((data) => {
      console.log(data)
    })
  }
  
  

  ngOnInit() {
  }

}
