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
  public image;

  credentialsForm = {
    email: "",
    password: "",
    name: "",
    address: "",
    bday: "",
    phone: "",
    confirmPassword: "",
    selfie: "",
    primaryIdPic: "",
    primaryIdNum: "",
    nbi: "",
    applyJob: ""
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

userProfile(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])

    reader.onload = (e) => {
      this.image = e.target
      this.image = this.image.result
    }
  }
}
}