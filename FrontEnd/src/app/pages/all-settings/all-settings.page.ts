import { Component, OnInit } from '@angular/core';
import {places} from '../places.model';
import {PopoverController} from '@ionic/angular';
import {SharePage} from '../../pages/share/share.page';

@Component({
  selector: 'app-all-settings',
  templateUrl: './all-settings.page.html',
  styleUrls: ['./all-settings.page.scss'],
})
export class AllSettingsPage implements OnInit {

  public placesInCebu = new places();
  public places = this.placesInCebu.placeInCebu()
  constructor( private popover: PopoverController,) { }

  ngOnInit() {
  }
  capitalizeFirstLetter(str) {
   return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }

    CreatePopover(){
      this.popover.create({component:SharePage,
      showBackdrop:false}).then((popoverElement)=>{
        
        popoverElement.present();
      })
    }
}
