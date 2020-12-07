import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  passwordType: string = 'password';
 passwordIcon: string = 'eye-off';

 passwordConfirmType: string = 'password';
 passwordConfirmIcon: string = 'eye-off';
 


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
    applyJob: "",
    tutorFile: "",
    nannyFile: "",
    housekeepingFile: "",
    haircutMassageFile: ""
  }
  constructor(
    private authService: AuthService,
    private router: Router,) { }

  ngOnInit() {
  }

  register() {

    this.authService.register(this.credentialsForm).subscribe(res => {
      this.authService.addImageToDatabase({name: this.credentialsForm.name, image: this.image}).subscribe((data) => {
        if(data) {
          this.router.navigate(['login']);
        }
      })
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

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

hideShowConfirmPassword() {
  this.passwordConfirmType = this.passwordConfirmType === 'text' ? 'password' : 'text';
  this.passwordConfirmIcon = this.passwordConfirmIcon === 'eye-off' ? 'eye' : 'eye-off';
}


}