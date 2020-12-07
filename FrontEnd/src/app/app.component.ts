import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService, 
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
 
      this.auth.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['job-orders']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  
  logout() {
    this.authService.logout();
    this.storage.remove('access_token');
    this.auth.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['job-orders']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
