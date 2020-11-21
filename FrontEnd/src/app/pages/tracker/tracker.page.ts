import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  public onGoingJob;

  constructor(
    private authService: AuthService,
    private http: Router
  ) { }

  ngOnInit() {
    this.authService.allJobsBeingAccepted({state: "completed"}).subscribe((data) => {
      this.onGoingJob = data
    })
  }
  myOnGoingTask() {
    this.authService.allJobsBeingAccepted({state: "accept"}).subscribe((data) => {
      this.onGoingJob = data
    })
  }
  alreadyDoneTask(index) {
    this.authService.addDataToJobOrders({ state: "completed", jobOffer: this.onGoingJob[index].data}).subscribe((data) => {
      this.onGoingJob = data
      this.deleteItemThroughIndex(index)
      this.http.navigate(['job-orders'])
    })
  }
  completedTasks() {
    this.authService.allJobsBeingAccepted({state: "completed"}).subscribe((data) => {
      this.onGoingJob = data
    })
  }
  rejectedTasks() {
    this.authService.allJobsBeingAccepted({state: "rejected"}).subscribe((data) => {
      this.onGoingJob = data
    })
  }


  deleteItemThroughIndex(index) {
    this.authService.deleteItem({state: "complete", index: index}).subscribe((data) => {
    })
  }

}
