import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public booleanIdentify = true
  public passwordOrText = "password"
  
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
    private router: Router) { }

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

  showHidePass(type) {
    this.passwordOrText = type
    if (this.booleanIdentify) {
      this.booleanIdentify = false
    } else {
      this.booleanIdentify = true
    }
  }

}