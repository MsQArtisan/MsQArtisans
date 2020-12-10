import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service"

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.page.html',
  styleUrls: ['./user-ratings.page.scss'],
})
export class UserRatingsPage implements OnInit {
very_sat = 1;
sat = 2;
ok= 0;
dis= 0;
very_dis= 0;


  constructor( 
    private authService: AuthService,
   ) { }

  ngOnInit() {
    this.authService.getReviews().subscribe((reviews:any)=>{
      console.log(reviews);
    })
  }

}
