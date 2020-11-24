import { Component, OnInit } from '@angular/core';
import {PopoverController, AlertController} from '@ionic/angular';
import {NotifSettingPage} from '../../pages/notif-setting/notif-setting.page';
import {NavController,ModalController,MenuController} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  dataFromModal;
  constructor( private popover: PopoverController, public navCtrl: NavController,
    public menuCtrl: MenuController, private modalController: ModalController,
    public alertController: AlertController)
     {this.menuCtrl.enable(true, 'main-menu'); }
  ngOnInit() {
    
    
  }

  CreatePopover(){
    this.popover.create({component:NotifSettingPage,
    showBackdrop:false}).then((popoverElement)=>{
      
      popoverElement.present();
    })
  }

 

}
