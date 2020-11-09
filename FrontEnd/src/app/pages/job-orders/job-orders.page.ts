import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  data: string= '';
  account: string = "";

  @Input() passdata: Array<any>;
  constructor(private authService: AuthService, private storage: Storage,
     private toastController: ToastController) { }

  ngOnInit() {
     this.getUser()
 
     

  }

  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res['msg'];
    });
  }
 
  logout() {
    this.authService.logout();
    this.storage.remove('access_token');
 
    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }

 
  // clearToken() {
  //   // ONLY FOR TESTING!
  //   this.storage.remove('access_token');
 
  //   let toast = this.toastController.create({
  //     message: 'JWT removed',
  //     duration: 3000
  //   });
  //   toast.then(toast => toast.present());
  // }

  // jessa
  getUser(){
    this.authService.getUser().subscribe((data:any)=>{
      this.account=data.info
    });
    
    
  }
}
