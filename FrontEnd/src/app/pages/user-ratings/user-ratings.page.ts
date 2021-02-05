import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service"
@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.page.html',
  styleUrls: ['./user-ratings.page.scss'],
})

export class UserRatingsPage implements OnInit {
  rating = 4.5
  rateArray = []
  public rateSum;
  public aveRate;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getReviews().subscribe((reviews: any) => {
      // this.rateArray = reviews.data.ratings
      // this.rateSum = this.rateArray.reduce((a, b) => a + b, 0);
      // this.aveRate = this.rateSum / reviews.data.ratings.length
    })
  }

}