import { Component, OnInit } from '@angular/core';
import {PopoverController, AlertController} from '@ionic/angular';
import {NavController,ModalController,MenuController} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public imageUrl;
  userAccount:string = '';
  public userName;
  public user = {
    name: "",
    phone: "",
    email: ""
  }

  dataFromModal;
  constructor(  public navCtrl: NavController,public menuCtrl: MenuController, 
    public alertController: AlertController,
    private authService: AuthService)
     {this.menuCtrl.enable(true, 'main-menu'); }
  ngOnInit() {
    this.account()
    this.authService.getUser().subscribe((data) => {
      this.user.name = data.data[0].name
      this.user.phone = data.data[0].phone
      this.user.email = data.data[0].email
    })
  } 

  account(){
    this.authService.getUser().subscribe((data:any)=>{
      this.userAccount=data.data[0];
      this.userName = data.data[0]
      this.authService.getTheProfileImage({name: this.userName.name}).subscribe((data) => {
        this.imageUrl = data[0].image[0]
      })
    })
  }
 

}
