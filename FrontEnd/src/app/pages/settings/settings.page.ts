import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'; 
import {PopoverController, AlertController} from '@ionic/angular';
import {NotifSettingPage} from '../../pages/notif-setting/notif-setting.page';
import {NavController,ModalController,MenuController} from '@ionic/angular';
// import{ AccountsInfoPage} from '../accounts-info/accounts-info.page'

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

  // async accInfo() {
  //   const modal = await this.modalController.create({
  //     component: AccountsInfoPage,
  //     componentProps: { name: 'Jessa Mae Yosores',address:"Sa kwarto",email:"mae@gmail.com",
  //   number:"09090909099", selfie:"gwapa.png", primaryId:"666",primaryPic:"gwapa Kaau.jpg",nbi:"nbi ni"},
  //     cssClass: 'setting-modal',
  //     backdropDismiss: false,
  //   });

  //   modal.present();
  //   this.dataFromModal = await modal.onWillDismiss();
  // }
  async handleButtonClick() {
      const alert = await this.alertController.create({
       
        // header: 'Use this lightsaber?',
     
        // buttons: ['Disagree', 'Agree']
      });
  
      await alert.present();
    }

}
