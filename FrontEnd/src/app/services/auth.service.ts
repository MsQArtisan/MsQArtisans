import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'access_token';
const userToken = 'user_token';
const forgotPassURL = 'http://localhost:5010/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userIDToken = ""
  public situationHandler;
  public situation = true
  public messageFromEnd = ""

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
          this.storage.get(userToken).then((token) => {
            this.userIDToken = token
          })
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
          this.situationHandler = res
          if (this.situationHandler.type) {
            this.storage.set(userToken, this.situationHandler.userId)
            this.userIDToken = this.situationHandler.userId
            this.storage.set(TOKEN_KEY, res['token']);
            this.user = this.helper.decodeToken(res['token']);
            this.authenticationState.next(true);
          } else {
            // this.returnTheStatus()
          }
        })
      )
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(userToken).then(() => {
        this.authenticationState.next(false);
      })
      window.location.reload()
    });
  }

  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
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

  getAllMessages() {
    return this.http.get("http://localhost:5005/api/allMessages")
  }

  getUser() {
    return this.http.post<any>(`${this.url}/api/account`, {id: this.userIDToken})
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

  addImageToDatabase(imageUrl) {
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

  getOrders(){
    return this.http.get(`${this.url}/api/getNewOrder`)
  }
  getCustomersName():Observable<any>{
    return this.http.get<any>(`${this.url}/api/getCustomersName`)
  }
  getCustomersData(userId) {
    return this.http.post(`${this.url}/api/getCustomersData`, {userId: userId})
  }
}
