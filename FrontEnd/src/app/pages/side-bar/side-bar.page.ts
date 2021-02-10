import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.page.html',
  styleUrls: ['./side-bar.page.scss'],
})
export class SideBarPage implements OnInit {

  constructor(    
    private auth: AuthService,
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.storage.remove('access_token');
    this.auth.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['/side-bar/job-orders']);
      } else {
        this.router.navigate(['home']);
      }
    });
  }
}
