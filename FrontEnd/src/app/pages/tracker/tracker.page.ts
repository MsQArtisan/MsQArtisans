import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  public completedTask = false
  public jobsOffered;
  public onGoingJob;

  constructor(
    private authService: AuthService,
    private http: Router
  ) { }

  ngOnInit() {
    this.authService.allJobsBeingAccepted({state: "completed"}).subscribe((data) => {
      this.jobsOffered = data
      this.onGoingJob = this.jobsOffered.jobs
    })
  }
  myOnGoingTask() {
    this.authService.allJobsBeingAccepted({state: "accept"}).subscribe((data) => {
      this.jobsOffered = data
      this.onGoingJob = this.jobsOffered.jobs
    })
  }
  alreadyDoneTask(index) {
    this.authService.addDataToJobOrders({currentUser: this.authService.userIDToken, state: "completed", jobOffer: this.jobsOffered.jobs[index].data}).subscribe((data) => {
      this.jobsOffered = data
      this.onGoingJob = this.jobsOffered.jobs
      this.deleteItemThroughIndex(index)
      this.http.navigate(['job-orders'])
    })
  }
  completedTasks() {
    this.authService.allJobsBeingAccepted({state: "completed"}).subscribe((data) => {
      this.jobsOffered = data
      this.onGoingJob = this.jobsOffered.jobs
    })
  }
  rejectedTasks() {
    this.authService.allJobsBeingAccepted({state: "rejected"}).subscribe((data) => {
      this.jobsOffered = data
      this.onGoingJob = this.jobsOffered.jobs
    })
  }


  deleteItemThroughIndex(index) {
    this.authService.deleteItem({state: "complete", index: index}).subscribe((data) => {
    })
  }

}
