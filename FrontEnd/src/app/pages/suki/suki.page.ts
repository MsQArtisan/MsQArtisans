import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service"

@Component({
  selector: 'app-suki',
  templateUrl: './suki.page.html',
  styleUrls: ['./suki.page.scss'],
})
export class SukiPage implements OnInit {
 suki='10';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getReviews().subscribe((reviews:any)=>{
      console.log(reviews);
      
    })
  }


}
