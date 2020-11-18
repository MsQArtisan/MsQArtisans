import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.page.html',
  styleUrls: ['./acc-info.page.scss'],
})
export class AccInfoPage implements OnInit {
  // name = "Chilla Jean Cabungcag"
  // phone = "09326516887"
  userAccount:string = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.account()
  }
  account(){
    this.authService.getUser().subscribe((data:any)=>{
      this.userAccount=data.data[0];
      console.log("account: ", this.userAccount)
    })
  }

}
