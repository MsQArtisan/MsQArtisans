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
  public imageUrl;
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
    // this.authService.getUser().subscribe((data) => {
    //   this.authService.getTheProfileImage({ name: data.data[0].name }).subscribe((data) => {
    //     this.imageUrl = data[0].image[0]
    //   })
    // })
    this.onGoingJob.length = 0
    this.functions.jobsAccepted(this.authService, { state: "Ongoing", user: this.authService.userIDToken }, this.onGoingJob)
    this.completedTask = true
    document.getElementById('completed').style.borderBottom = '2px solid rgb(132, 208, 255)'
    document.getElementById('going').style.borderBottom = 'none'
    document.getElementById('reject').style.borderBottom = 'none'
  }

  myOnGoingTask() {
    this.rejectedTask = false
    this.onGoingJob.length = 0
    this.functions.onGoingTask(this.authService,{ state: "accept", user: this.authService.userIDToken }, this.onGoingJob)
    this.completedTask = false
  }

  //Finish Or Completed Task
  alreadyDoneTask(index, dataId, cost) {
    alert(dataId)
    this.authService.acceptedJobsBeingCompleted({ currentUser: this.authService.userIDToken, state: "completed", jobOffer: dataId, cost: cost }).subscribe((data) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Thank you for using our app!',
          showConfirmButton: false,
          timer: 1000
        })
        this.http.navigate(['job-orders'])
      }
    })
  }

  completedTasks() {
    this.onGoingJob.length = 0
    this.functions.completedTask(this.authService, { state: "completed", user: this.authService.userIDToken },this.onGoingJob)
    this.completedTask = true
    this.rejectedTask = false
  }

  rejectedTasks() {
    this.completedTask = true
    this.rejectedTask = true
    this.onGoingJob.length = 0
    this.functions.rejectedTask(this.authService, { state: "rejected", user: this.authService.userIDToken }, this.onGoingJob)
  }

//When you want to remove all your  completed Task under Completed Task History 
  deleteCompletedTask(customerId) {
    console.log("id:"+customerId)
    this.authService.deletedCompletedTask(customerId).subscribe((data) => {
    })
  }

  //Restore Task
  restoredTask(restoreId) {
    this.authService.jobRestored(restoreId).subscribe((result) => {
      if (result['success']) {

        Swal.fire({
          title: 'The job is still available!',
          text: "Are you sure you want to restore this?",
          icon: 'warning',
          showCancelButton:true,
          confirmButtonColor: '#27C641',
          cancelButtonColor: '#a8a8a8',
          confirmButtonText: 'Yes,restore it!'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("Successfully Stored!")
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })

      }

      else {
        Swal.fire({
          title: 'The job is no longer available!',
          text: "Are you sure you want to delete this?",
          icon: 'warning',
          showCancelButton:true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#a8a8a8',
          confirmButtonText: 'Yes,delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("Successfully Deleted!")
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }

    })

  }


}
