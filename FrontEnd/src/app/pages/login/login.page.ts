import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';


  credentialsForm={
    email: "",
    password: ""
  }
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService) { }
 
  ngOnInit() {
  }
 
  onSubmit() {
    // console.log(this.credentialsForm)
    this.authService.login(this.credentialsForm).subscribe();
    this.resetForm();

  }
 
  resetForm(){
    this.credentialsForm={
      email: "",
      password: ""
    }
  }

  hideShowPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
