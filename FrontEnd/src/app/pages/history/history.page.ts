import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public initial;
  public arrayToRender = []
  public dataToDisplay = {
    text: "You've accepted a Nanny Service that cost 900 at Nasipit Road, Talamban, Cebu City",
  }

  constructor(
    private http: AuthService
  ) { }

  ngOnInit() {
    this.http.getAllLogsHistory({currentUser: this.http.userIDToken}).subscribe((data) => {
      this.initial = data
      this.initial.forEach(element => {
        this.http.getCustomersData(element.jobsOfferedThroughId).subscribe((res) => {
          this.arrayToRender.push(res)
        })
      })
    })
  }

}