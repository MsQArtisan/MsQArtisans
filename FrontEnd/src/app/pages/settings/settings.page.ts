import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'; 
import {PopoverController, AlertController} from '@ionic/angular';
import {NotifSettingPage} from '../../pages/notif-setting/notif-setting.page';
import {NavController,ModalController,MenuController} from '@ionic/angular';
// import{ AccountsInfoPage} from '../accounts-info/accounts-info.page'
import {places} from '../places.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  dataFromModal;
  public placesInCebu = new places();
  public places = this.placesInCebu.placeInCebu()
  constructor( private popover: PopoverController, public navCtrl: NavController,
    public menuCtrl: MenuController, private modalController: ModalController,
    public alertController: AlertController)
     {this.menuCtrl.enable(true, 'main-menu'); }
  ngOnInit() {
    console.log(this.placesInCebu.placeInCebu());
    
  }

  CreatePopover(){
    this.popover.create({component:NotifSettingPage,
    showBackdrop:false}).then((popoverElement)=>{
      
      popoverElement.present();
    })
  }

 

}
