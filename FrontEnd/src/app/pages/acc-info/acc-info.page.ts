import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc-info',
  templateUrl: './acc-info.page.html',
  styleUrls: ['./acc-info.page.scss'],
})
export class AccInfoPage implements OnInit {
  name = "Chilla Jean Cabungcag"
  phone = "09326516887"
  constructor() { }

  ngOnInit() {
  }

}
