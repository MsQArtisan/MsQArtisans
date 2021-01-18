import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

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
  public darkMode = false

  constructor(
    private authService: AuthService, 
    private storage: Storage,
    // private toastController: ToastController,
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
      this.auth.authenticationState.subscribe(state=>{
        if (state) {
          this.router.navigate(['job-orders']);
       
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  
  logout() {
    this.authService.popTheUserAfterLogout().subscribe()
    this.authService.logout();
    this.storage.remove('access_token');
 
    // let toast = this.toastController.create({
    //   duration: 3000
    // });
    // toast.then(toast => toast.present());
    this.auth.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['job-orders']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

}
