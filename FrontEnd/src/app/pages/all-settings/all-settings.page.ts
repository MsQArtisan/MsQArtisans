import { Component, OnInit, ViewChild} from '@angular/core';
import {places} from '../places.model';

@Component({
  selector: 'app-all-settings',
  templateUrl: './all-settings.page.html',
  styleUrls: ['./all-settings.page.scss'],
})
export class AllSettingsPage implements OnInit {

  public placesInCebu = new places();
  public places = this.placesInCebu.placeInCebu()
  constructor() { 
  }

  ngOnInit() {
  }
  capitalizeFirstLetter(str) {
   return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }
}
