import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FunctionsToUse } from '../../functions/functions.model'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  public buttonText = "Finish Service"
  public functions = new FunctionsToUse()

  public noTaskShow = false

  public completedTask = false
  public rejectedTask = false
  public jobsOffered;
  public onGoingJob = [];

  constructor(
    private authService: AuthService,
    private http: Router
  ) { }

  ngOnInit() {
    this.onGoingJob.length = 0
    this.functions.jobsAccepted(this.authService, {state: "completed"}, this.onGoingJob)
    this.completedTask = true
    document.getElementById('completed').style.borderBottom = '2px solid rgb(132, 208, 255)'
    document.getElementById('going').style.borderBottom = 'none'
    document.getElementById('reject').style.borderBottom = 'none'
  }
  
  myOnGoingTask() {
    this.rejectedTask = false
    this.onGoingJob.length = 0
    this.functions.onGoingTask(this.authService, {state: "accept", user: this.authService.userIDToken}, this.onGoingJob)
    this.completedTask = false
  }
  alreadyDoneTask(index) {
    this.authService.addDataToJobOrders({currentUser: this.authService.userIDToken, state: "completed", jobOffer: this.onGoingJob[index].data}).subscribe((data) => {
      if(data) {
        Swal.fire({
          icon: 'success',
          title: 'Thank you for using our app!',
          showConfirmButton: false,
          timer: 1000
        })
        this.deleteItemThroughIndex(index)
        this.http.navigate(['job-orders'])  
      }
    })
  }
  completedTasks() {
    this.onGoingJob.length = 0
    this.functions.completedTask(this.authService, {state: "completed"}, this.onGoingJob)
    this.completedTask = true
    this.rejectedTask = false
  }

  rejectedTasks() {
    this.completedTask = true
    this.rejectedTask = true
    this.onGoingJob.length = 0
    this.functions.rejectedTask(this.authService, {state: "rejected"}, this.onGoingJob)
  }


  deleteItemThroughIndex(index) {
    this.authService.deleteItem({state: "complete", index: index}).subscribe((data) => {
    })
  }

}
