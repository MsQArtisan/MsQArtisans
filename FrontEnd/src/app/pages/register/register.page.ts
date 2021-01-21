import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public selfie: any;

  credentialsForm = {
    email: "star808fer@gmail.com",
    password: "Vl@ck48cAl!",
    name: "Yubert Verzano Mariscal",
    address: "Nalhub, Dalaguete, Cebu",
    bday: "",
    phone: "09968817703",
    confirmPassword: "Vl@ck48cAl!",
    selfie: "",
    primaryIdPic: "",
    primaryIdNum: "18106154",
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

  onFileChange(fileChangeEvent) {
    if (fileChangeEvent.target.files && fileChangeEvent.target.files[0]) {
      var reader = new FileReader();
      this.selfie = fileChangeEvent.target.files[0];
      reader.readAsDataURL(fileChangeEvent.target.files[0])
      reader.onload = (e) => {
      }
    }
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.credentialsForm).subscribe(res => {
      this.authService.imgUpload(this.selfie).subscribe((data) => {
        console.log(this.selfie)
        if (data) {
          this.router.navigate(['login'])
        }
      })
    });
  }

}