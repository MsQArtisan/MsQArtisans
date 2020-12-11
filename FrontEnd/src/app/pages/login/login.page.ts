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
  public dataResponse;

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
    this.authService.login(this.credentialsForm).subscribe((data) => {
      this.dataResponse = data
      if(this.dataResponse.msg == "password") {
        this.passwordMessage = true
        this.emailMessage = false
      }else{
        this.emailMessage = true
        this.passwordMessage = false
      }
    });
    this.resetForm()
  }

  showAndHidePass(type) {
    this.passwordOrText = type
    if (this.booleanIdentify) {
      this.booleanIdentify = false
    } else {
      this.booleanIdentify = true
    }
  }

  resetForm(){
    this.credentialsForm = {
      email: "",
      password: ""
    }
  }
}
