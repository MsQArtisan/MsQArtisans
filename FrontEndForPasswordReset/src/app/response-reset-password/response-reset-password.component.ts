import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ResetPasswordService } from '../reset-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.scss']
})
export class ResponseResetPasswordComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;

  constructor(private authService: ResetPasswordService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
      this.CurrentState = 'Wait';
      this.route.params.subscribe(params => {
      this.resetToken = params.token;
      });
     }

  ResponseResetForm: FormGroup;
  ngOnInit() {
    this.Init();
    this.VerifyToken();
  }
  VerifyToken() {
    this.authService.ValidPasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(8)]], //, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }


  ResetPassword(form) {
    if (form.valid) {
      this.IsResetFormValid = true;
      this.authService.newPassword(this.ResponseResetForm.value).subscribe(
        data => {
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else { this.IsResetFormValid = false; }
  }
}


