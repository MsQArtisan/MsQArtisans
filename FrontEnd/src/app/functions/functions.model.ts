export class FunctionsToUse {
    jobsAccepted(service, requestState, onGoingJob) {
        service.allJobsBeingAccepted(requestState).subscribe((data) => {
            data.jobs.forEach(element => {
                onGoingJob.push(element)
            });
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
            data.jobs.forEach(element => {
                onGoingJob.push(element)
            });
        })
    }
    completedTask(service, requestState, onGoingJob) {
        document.getElementById('completed').style.borderBottom = '2px solid rgb(132, 208, 255)'
        document.getElementById('going').style.borderBottom = 'none'
        document.getElementById('reject').style.borderBottom = 'none'


        service.allJobsBeingAccepted(requestState).subscribe((data) => {
            data.jobs.forEach(element => {
                onGoingJob.push(element)
            })
        })
    }
    rejectedTask(service, requestState, onGoingJob) {
        document.getElementById('reject').style.borderBottom = '2px solid rgb(132, 208, 255)'
        document.getElementById('completed').style.borderBottom = 'none'
        document.getElementById('going').style.borderBottom = 'none'
        service.allJobsBeingAccepted(requestState).subscribe((data) => {
            data.jobs.forEach(element => {
                onGoingJob.push(element)
            })
        })
    }
}
