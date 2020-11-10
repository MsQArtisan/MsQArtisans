import { Component, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService) { }
 
  ngOnInit() {
  }
 
  onSubmit() {
    console.log(this.credentialsForm)
    this.authService.login(this.credentialsForm).subscribe();

  }
 
}
