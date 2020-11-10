import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.page.html',
  styleUrls: ['./forget-pass.page.scss'],
})
export class ForgetPassPage implements OnInit {
  email: string = null;
  constructor() { }

  ngOnInit() {
  }
  confirmSentForgotPassword(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
      
    }
}
