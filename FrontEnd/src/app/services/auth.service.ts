import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject,Observable, throwError , of} from 'rxjs';

const TOKEN_KEY = 'access_token';
const forgotPassURL = 'http://localhost:5010/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
 
  login(credentials) {
    return this.http.post(`${this.url}/api/login`, credentials)
      .pipe(
        tap(res => {
          
          
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      )
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      // window.location.reload()
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  getUser():Observable<any>{
    console.log("account");
    return this.http.get<any>(`${this.url}/api/account`)
  }
  addDataToJobOrders(data) {
    return this.http.post(`${this.url}/api/jobOrdersData`, data)
  }

  allJobsBeingAccepted(data) {
    return this.http.post(`${this.url}/api/allJobsAccepted`, data)
  }
  deleteItem(data) {
    return this.http.post(`${this.url}/api/jobsToDelete`, data)
  }

  addImageToDatabase(imageUrl){
    return this.http.post("http://localhost:3000/api/imageUpload", imageUrl)
  }
  
  getTheProfileImage(usersName) {
    return this.http.post("http://localhost:3000/api/getUserProfile", usersName)
  }
  
  requestReset(body): Observable<any> {
    return this.http.post(`${forgotPassURL}/reqResetPassword`, body);
  }

  newPassword(body): Observable<any> {
    return this.http.post(`${forgotPassURL}/new-password`, body);
  }

  ValidPasswordToken(body): Observable<any> {
    return this.http.post(`${forgotPassURL}/valid-password-token`, body);
  }

}
