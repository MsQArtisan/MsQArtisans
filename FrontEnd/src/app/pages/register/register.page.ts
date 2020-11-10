import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm={
    email: "",
    password: ""
  }
  constructor(
    private authService: AuthService,
    private router: Router) { }
 
  ngOnInit() {
  }
 
  register() {
    console.log(this.credentialsForm);
    
    this.authService.register(this.credentialsForm).subscribe(res => {
      this.router.navigate(['login']);
    });
  }
}
