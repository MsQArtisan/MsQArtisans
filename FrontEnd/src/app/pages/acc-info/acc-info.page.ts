import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.page.html',
  styleUrls: ['./acc-info.page.scss'],
})
export class AccInfoPage implements OnInit {
  public imageUrl;
  public image;
  userAccount: string = '';
  public userName;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.account()
  }
  account() {
    this.authService.getUser().subscribe((data: any) => {
      this.userAccount = data.data[0];
      this.userName = data.data[0]
      this.authService.getTheProfileImage({ name: this.userName.name }).subscribe((data) => {
        this.image = data
        this.imageUrl = this.image.image
      })
    })
  }

}
