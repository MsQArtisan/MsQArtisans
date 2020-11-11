import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  data = '';
  userAccount:string = '';
  
  jobTitle= "Nanny";
  schedule= "Nov.10,20 - 12:00 pm";
  location= "Nasipit Rd, Talamban Cebu";
  rate= "4000 Pesos"
  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController) { }

  ngOnInit() {
    this.account()
  }


  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res['msg'];
    });
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

  account(){
    this.authService.getUser().subscribe((data:any)=>{
      this.userAccount=data.data[0];
      console.log("account: ", this.userAccount)
    })
  }
}
