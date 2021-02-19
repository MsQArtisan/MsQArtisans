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
  public primaryIdPic: any;
  public nbi: any;

  // for testing only
  // credentialsForm = {
  //   email: "test@gmail.com",
  //   password: "Vl@ck48cAl!",
  //   name: "Test101",
  //   address: "Cebu City",
  //   bday: "",
  //   phone: "09968817703",
  //   confirmPassword: "Vl@ck48cAl!",
  //   selfie: "",
  //   primaryIdPic: "",
  //   primaryIdNum: "18106154",
  //   nbi: "",
  //   applyJob: "",
  //   tutorFile: "",
  //   nannyFile: "",
  //   housekeepingFile: "",
  //   haircutMassageFile: ""
  // }

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

  onFileChange(fileChangeEvent, type) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.readAsDataURL(event.target.files[0]); // read file as data url
    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.images = event.target.result as string;
    //   }
    // }
    if (fileChangeEvent.target.files.length == 0) {
      console.log("No file selected!");
      return
    }
    if (fileChangeEvent.target.files && fileChangeEvent.target.files[0]) {
      let file = (fileChangeEvent.target as HTMLInputElement).files[0];
      var reader = new FileReader();
      reader.readAsDataURL(fileChangeEvent.target.files[0])
      reader.onload = () => {
      }
      if (type == 'selfie') {
        this.selfie = file
        this.credentialsForm.selfie = this.selfie["name"]
      }
      if (type == 'primaryIdPic') {
        this.primaryIdPic = file
        this.credentialsForm.primaryIdPic = this.primaryIdPic["name"]
      } else {
        this.nbi = file
        this.credentialsForm.nbi = this.nbi["name"]
      }
    }
  }

// onFileChange(event, type){
//   const reader = new FileReader()
//   if(event.target.files && event.target.files.length){
//     const [file] = event.target.files;
//     reader.readAsDataURL(file);
//     reader.onload =() =>{
//       this.data.patchValue({
//         tso: reader.result
//       })
//     }
//   }
// }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.credentialsForm).subscribe(res => {
      this.authService.imgUpload(
        { image: this.selfie, imageName: this.credentialsForm.selfie },
        { image: this.primaryIdPic, imageName: this.credentialsForm.primaryIdPic },
        { image: this.nbi, imageName: this.credentialsForm.nbi }
      ).subscribe((data) =>{
        // this.authService.imgUpload1(this.primaryIdPic).subscribe(res => {
        //   this.authService.imgUpload2(this.nbi).subscribe((data) => {
        if (data) {
          this.router.navigate(['login'])
        }
        //   })
        // })
      })
    });
  }
}