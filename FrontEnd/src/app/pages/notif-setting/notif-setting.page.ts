import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';


@Component({
  selector: 'app-notif-setting',
  templateUrl: './notif-setting.page.html',
  styleUrls: ['./notif-setting.page.scss'],
})
export class NotifSettingPage implements OnInit {

  constructor(private popover:PopoverController,   ) {}

  ngOnInit() {
  }
  ClosePopover(){
    this.popover.dismiss();
  }


}