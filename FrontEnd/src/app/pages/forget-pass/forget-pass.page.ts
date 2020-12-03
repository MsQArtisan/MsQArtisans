import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.page.html',
  styleUrls: ['./forget-pass.page.scss'],
})
export class ForgetPassPage implements OnInit {

 
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  
  constructor(
    private authService: AuthService,
    private router: Router,
   ) {

  }

  RequestResetForm: FormGroup;
  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
        },
        err => {

          if (err.error.message) {
            console.log("error mga fre")
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}