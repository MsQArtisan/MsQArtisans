import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  public user;

  constructor(
    private http : AuthService
  ) { 
    
  }

  ngOnInit() {
    this.http.getCompleteData().subscribe((data) =>{
      console.log(data)
      this.user = data
    })
  }
}
