import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm={
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

  // <i class="fas fa-eye-slash"></i>
 


}
