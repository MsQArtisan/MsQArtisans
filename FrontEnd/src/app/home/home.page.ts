import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  show=true;
  constructor(private router: Router) {
    setTimeout (()=>{
      this.show=false;
      this.router.navigate(['/login']);
    },5000);
  }
}