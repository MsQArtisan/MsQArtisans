import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
const forgotPassURL = 'http://localhost:5010/api';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
    
  ) { }

  newPassword(body): Observable<any> {
    return this.http.post(`${forgotPassURL}/new-password`, body);
  }
  
  ValidPasswordToken(body) {
    return this.http.post(`${forgotPassURL}/valid-password-token`, body);
  }
  
}

