import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // public file: File;
  public selfie: any;

  credentialsForm = {
    email: "a@gmail.com",
    password: "Vl@ck48cAl!",
    name: "Testing",
    address: "Cebu",
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
    private router: Router,
    private http: HttpClient) { }

  // onFileChange(fileChangeEvent) {
  //   this.selfie = fileChangeEvent.target.files[0];
  // }
  onFileChange(fileChangeEvent) {
    if (fileChangeEvent.target.files && fileChangeEvent.target.files[0]) {
      var reader = new FileReader();

      this.selfie =fileChangeEvent.target.files[0];
      reader.readAsDataURL(fileChangeEvent.target.files[0])
      reader.onload = (e) => {
        // this.selfie = e.target
        // this.selfie = this.selfie.result
      }
    }
  }
  // userProfile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0])

  //     reader.onload = (e) => {
  //       this.image = e.target
  //       this.image = this.image.result
  //     }
  //   }
  // }

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