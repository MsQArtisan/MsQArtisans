import { Component, OnInit } from '@angular/core';
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
    password: "",
    name:"",
    address:"",
    bday:"",
    phone:"",
    confirmPassword:"",
    selfie:"",
    primaryIdPic:"",
    primaryIdNum:"",
    nbi:"",
    applyJob:"",
    tutorFile:"",
    nannyFile:"",
    housekeepingFile:"",
    haircutMassageFile:""
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