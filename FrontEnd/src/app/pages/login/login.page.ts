import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public emailMessage = false
  public passwordMessage = false
  public message = ""
  public dataResponse;
  public booleanIdentify = true
  public passwordOrText = "password"

  public credentialsForm = {
    email: "star808fer@gmail.com",
    password: "Vl@ck48cAl!"
  }
  constructor(private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  // onSubmit() {
  //   this.authService.login(this.credentialsForm).subscribe((data) => {
  //     this.situationHandler = data
  //     if (this.situationHandler.msg == 'email') {
  //       this.emailMessage = true
  //       this.passwordMessage = this.situationHandler.type
  //     } else {
  //       this.passwordMessage = true
  //       this.emailMessage = this.situationHandler.type
  //     }
  //     this.resetForm()
  //   })
  // }

  onSubmit(){
    this.presentLoading()
    this.authService.login(this.credentialsForm).subscribe((data) => {
      this.dataResponse = data
      if (this.dataResponse.msg == "password") {
        this.passwordMessage = true
        this.emailMessage = false
      } else {
        this.emailMessage = true
        this.passwordMessage = false
      }
    });
    this.resetForm()
  }

  showAndHidePass(type) {
    this.passwordOrText = type
    if (this.booleanIdentify) {
      this.booleanIdentify = false
    } else {
      this.booleanIdentify = true
    }
  }

  resetForm() {
    this.credentialsForm = {
      email: "",
      password: ""
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
  
}
