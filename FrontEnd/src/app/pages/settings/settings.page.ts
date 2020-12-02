import { Component, OnInit } from '@angular/core';
import {PopoverController, AlertController} from '@ionic/angular';
import {NavController,ModalController,MenuController} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  dataFromModal;
  constructor(  public navCtrl: NavController,public menuCtrl: MenuController, 
    public alertController: AlertController)
     {this.menuCtrl.enable(true, 'main-menu'); }
  ngOnInit() {
    
    
  }
 

}
