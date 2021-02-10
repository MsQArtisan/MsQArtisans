import { Component, OnInit } from '@angular/core';
import { places } from '../places.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-all-settings',
  templateUrl: './all-settings.page.html',
  styleUrls: ['./all-settings.page.scss'],
})
export class AllSettingsPage implements OnInit {
  public footer: boolean = true;
  public placesInCebu = new places();
  public places = this.placesInCebu.placeInCebu()


  text: string = 'Flamenco'
  imgurl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcVHnqybmOZV1F9RrkMo-nqDb1FL8hxmiosQ&usqp=CAU'
  link: string = 'https://link.medium.com/JA4amAHFJ5'
  constructor(private socialSharing: SocialSharing, ) { }

  ngOnInit() {
  }
  capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  }

  hideAndShow() {
    if (this.footer) {
      this.footer = false;
    } else {
      this.footer = true;
    }
  }

}
