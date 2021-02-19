import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService {

  url = 'http://18.220.197.206:5000';


  constructor(private http: HttpClient) { }

  newPassword(body): Observable<any> {
    return this.http.post(`${this.url}/api/new-password`, body);
  }

  ValidPasswordToken(body) {
    return this.http.post(`${this.url}/api/valid-password-token`, body);
  }

}
