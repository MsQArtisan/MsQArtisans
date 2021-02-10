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
  userAccount
  userName;
  userEmail
  dataFromModal;
  constructor(  public navCtrl: NavController,public menuCtrl: MenuController, 
    public alertController: AlertController,
    private authService: AuthService)
    
     {this.menuCtrl.enable(true, 'content-id'); }

  ngOnInit() {
    this.authService.getUser().subscribe((data) => {
      data.data.forEach(element => {
        this.userAccount = element.selfie
        this.userName = element.name
        this.userEmail = element.email
      });
    })
  } 

  
}