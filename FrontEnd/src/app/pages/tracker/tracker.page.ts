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

  ngOnInit(){
    this.onGoingJob.length = 0
    this.functions.jobsAccepted(this.authService, { state: "Ongoing", user: this.authService.userIDToken}, this.onGoingJob)
    this.completedTask = true
    document.getElementById('completed').style.borderBottom = '2px solid rgb(132, 208, 255)'
    document.getElementById('going').style.borderBottom = 'none'
    document.getElementById('reject').style.borderBottom = 'none'
  }

  //All Ongoing Task Jobs
  myOnGoingTask() {
    this.rejectedTask = false
    this.onGoingJob.length = 0
    this.functions.onGoingTask(this.authService, { state: "accept", user: this.authService.userIDToken }, this.onGoingJob)
    this.completedTask = false
  }

  //Finish Service Button
  alreadyDoneTask(index, dataId, cost) {
    this.authService.acceptedJobsBeingCompleted({ currentUser:this.authService.userIDToken, state:"completed",jobOffer: dataId, cost: cost }).subscribe((data) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Congrats! You have done an excellent service!',
          showConfirmButton: false,
          timer: 1000
        })
        document.getElementById(dataId).style.display = 'none';
      }
    })
  }

  //All Completed Task
  completedTasks() {
    this.onGoingJob.length = 0
    this.functions.completedTask(this.authService, { state: "completed", user: this.authService.userIDToken }, this.onGoingJob)
    this.completedTask = true
    this.rejectedTask = false
    
  }

  //All Rejected Jobs
  rejectedTasks() {
    this.completedTask = true
    this.rejectedTask = true
    this.onGoingJob.length = 0
    this.functions.rejectedTask(this.authService, { state: "rejected", user: this.authService.userIDToken }, this.onGoingJob)
  }

  //Delete Completed Task under Completed Task History 
  deleteCompletedTask(customerId) {
    this.authService.deletedCompletedTask(customerId).subscribe((data) => {
      if (data['success']) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully Deleted!',
        })
        document.getElementById(customerId).style.display = 'none';
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          timer: 1500
        })
      }

    })
  }


  //Restore Task Jobs under Rejected History
  restoredTask(restoreId, userTaskId) {
    this.authService.jobRestored(restoreId, userTaskId).subscribe((result) => {
      if (result['success']) {
        Swal.fire({
          title: 'The job is still available!',
          text: "Are you sure you want to restore this?",
          showCancelButton: true,
          confirmButtonColor: '#27C641',
          cancelButtonColor: '#a8a8a8',
          confirmButtonText: 'Yes,restore it!'
        }).then((result) => {
            if (result.isConfirmed) {
              this.authService.deletedCompletedTask(userTaskId).subscribe((data) => {
                if (data['success']) {
                  Swal.fire(
                    'Restore!',
                    'Job has been stored successfully.',
                    'success'
                  ).then(res => {
                      document.getElementById(userTaskId).style.display = 'none';
                    })
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    timer: 1500
                  })
                }
              })

            }
          })

      }

      else {
        Swal.fire({
          title: 'The job is no longer available!',
          text: "Are you sure you want to delete this?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#a8a8a8',
          confirmButtonText: 'Yes,delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.authService.deletedCompletedTask(userTaskId).subscribe((data) => {
              if (data['success']) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                ).then(res => {
                  document.getElementById(userTaskId).style.display = 'none';
                })
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  timer: 1500
                })
              }
            })

          }
        })
      }

    })

  }

}