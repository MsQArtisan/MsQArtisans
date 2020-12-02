import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.url;

  constructor(
    private http: HttpClient,
    
  ) { }

  newPassword(body): Observable<any> {
    return this.http.post(`${this.url}/api/new-password`, body);
  }
  
  ValidPasswordToken(body) {
    return this.http.post(`${this.url}/api/valid-password-token`, body);
  }
  
}

