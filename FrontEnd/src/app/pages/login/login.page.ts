import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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

  onSubmit() {
    this.authService.login(this.credentialsForm).subscribe();
  }

  showAndHidePass(type) {
    this.passwordOrText = type
    if (this.booleanIdentify) {
      this.booleanIdentify = false
    } else {
      this.booleanIdentify = true
    }
  }
}
