export class FunctionsToUse {
    jobsAccepted(service, requestState, onGoingJob) {
        service.allCompletedJobs(requestState).subscribe((data) => {
            data.forEach(element => {
                service.getCustomersData(element.customerId).subscribe((data) => {
                    onGoingJob.push({user: data, jobs: element})
                })
            })
            document.getElementById('completed').style.borderBottom = '2px solid rgb(132, 208, 255)'
            document.getElementById('going').style.borderBottom = 'none'
            document.getElementById('reject').style.borderBottom = 'none'
        })
    }
    onGoingTask(service, requestState, onGoingJob) {
        document.getElementById('going').style.borderBottom = '2px solid rgb(132, 208, 255)'
        document.getElementById('completed').style.borderBottom = 'none'
        document.getElementById('reject').style.borderBottom = 'none'

        service.allJobsBeingAccepted(requestState).subscribe((data) => {
            data.forEach(element => {
                service.getCustomersData(element.customerId).subscribe((data) => {
                    onGoingJob.push({user: data, jobs: element})
                })
            })
        })
    }
    completedTask(service, requestState, onGoingJob) {
        document.getElementById('completed').style.borderBottom = '2px solid rgb(132, 208, 255)'
        document.getElementById('going').style.borderBottom = 'none'
        document.getElementById('reject').style.borderBottom = 'none'


        service.allCompletedJobs(requestState).subscribe((data) => {
            data.forEach(element => {
                service.getCustomersData(element.customerId).subscribe((value) => {
                    onGoingJob.push({user: value, jobs: element})
                })
            })
        })
    }
    rejectedTask(service, requestState, onGoingJob) {
        document.getElementById('reject').style.borderBottom = '2px solid rgb(132, 208, 255)'
        document.getElementById('completed').style.borderBottom = 'none'
        document.getElementById('going').style.borderBottom = 'none'

        service.allCompletedJobs(requestState).subscribe((data) => {
            data.forEach(element => {
                service.getCustomersData(element.customerId).subscribe((value) => {
                    onGoingJob.push({user: value, jobs: element})
                })
            })
        })
    }
}