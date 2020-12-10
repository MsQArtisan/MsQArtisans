import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public situationHandler;
  public emailMessage = false
  public passwordMessage = false
  public message = ""

  public booleanIdentify = true
  public passwordOrText = "password"

  public credentialsForm = {
    email: "",
    password: ""
  }
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
  }

  // onSubmit() {
  //   this.authService.login(this.credentialsForm).subscribe();
  //   this.resetForm()
  // }

  onSubmit() {
    this.authService.login(this.credentialsForm).subscribe((data) => {
      
      this.situationHandler = data
      if (this.situationHandler.msg == 'email') {
        this.emailMessage = true
        this.passwordMessage = this.situationHandler.type
      } else {
        this.passwordMessage = true
        this.emailMessage = this.situationHandler.type
      }
      this.resetForm()
    })
  }

  showAndHidePass(type) {
    this.passwordOrText = type
    if (this.booleanIdentify) {
      this.booleanIdentify = false
    } else {
      this.booleanIdentify = true
    }
  }

  resetForm() {
    this.credentialsForm = {
      email: "",
      password: ""
    }
  }
}
