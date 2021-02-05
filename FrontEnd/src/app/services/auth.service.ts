import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'access_token';
const userToken = 'user_token';
const forgotPassURL = 'http://localhost:5000/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userIDToken:string;
  public situationHandler;
  public situation = true;
  public messageFromEnd = "";

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController, private router: Router) {
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
          this.storage.get(userToken).then((token)=> {
            this.userIDToken=token
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
    console.log(credentials)
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  login(credentials){
    return this.http.post(`${this.url}/api/login`, credentials)
    // return this.http.post('http://172.16.33.3:5000/api/login', credentials)
      .pipe(
        tap(res => {
          this.situationHandler = res
          if (this.situationHandler.type) {
            this.storage.set(userToken,this.situationHandler.userId)
            this.userIDToken=this.situationHandler.userId;
            this.storage.set(TOKEN_KEY, res['token']);
            this.user = this.helper.decodeToken(res['token']);
            this.authenticationState.next(true);
            this.router.navigate(['job-orders']);

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
    });
  }

  popTheUserAfterLogout() {
    return this.http.post(`${this.url}/api/logout`, { user: this.userIDToken })
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
    return this.http.get(`${this.url}/api/allMessages`)
  }

  getUser() {
    return this.http.post<any>(`${this.url}/api/account`, { id: this.userIDToken })
  }

  //Check Rejected Model and compare it into the Bookings Model(display all pendings)
  checkRejected(userIDToken) {
    return this.http.post<any>(`${this.url}/api/checkRejected`, { id: userIDToken })
  }

  addDataToJobOrders(data) {
    return this.http.post(`${this.url}/api/jobOrdersData`, data)
  }

  //RejectingJobOrderes
  rejectedJobOrders(data) {
    return this.http.post(`${this.url}/api/rejectedJobOrders`, data)
  }

  acceptedJobsBeingCompleted(data) {
    return this.http.post(`${this.url}/api/acceptedJobToCompleted`, data)
  }

  monthlyIncomeStatistics(currentUser) {
    return this.http.post(`${this.url}/api/stats`, currentUser)
  }

  allJobsBeingAccepted(data) {
    return this.http.post(`${this.url}/api/allJobsAccepted`, data)
  }

  allCompletedJobs(data) {
    return this.http.post(`${this.url}/api/allCompletedJobs`, data)
  }

  //AllRejectedJobs for History 
  allRejectedJobs(data) {
    return this.http.post(`${this.url}/api/allRejectedJobs`, data)
  }

  //When you clicked the Deleted Task Completed or When you want to remove all your completed Task under Completed Task History
  deletedCompletedTask(dataid) {
    return this.http.post(`${this.url}/api/deletedCompletedTask`, { deletedId: dataid })
  }

  //Restore Task Job under Rejected History
  jobRestored(id, userTaskId) {
    return this.http.post(`${this.url}/api/jobRestored`, { restoreId: id, userId: userTaskId })
  }

  imgUpload(selfie, primaryIdPic, nbi) {
    let data: any = new FormData();
    data.append("image[]", selfie.image, selfie.imageName);
    data.append("image[]", primaryIdPic.image, primaryIdPic.imageName);
    data.append("image[]", nbi.image, nbi.imageName);
    return this.http.post(`${this.url}/api/upload`, data)
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
  getAllActiveUsers() {
    return this.http.get(`${this.url}/api/allActiveUsers`)
  }

  getOrders() {
    return this.http.get(`${this.url}/api/getNewOrder`)
  }
  getCustomersName(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/getCustomersName`)
  }

  getCustomersData(userId) {
    return this.http.post(`${this.url}/api/getCustomersData`, { userId: userId })
  }
  
  // allLogsHistory
  getAllLogsHistory(id) {
    return this.http.post(`${this.url}/api/allLogsHistory`, id)
  }

  getReviews(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/reviews`)
  }
}