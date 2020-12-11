// array, request, toPassarray
exports.module = (jobsArray, request, arrayPassToFront, loggedUsers) => {
    loggedUsers.forEach(value => {
        if(value._id == request.user) {
            jobsArray.forEach(element => {
                if(element.email == value.email) {
                    arrayPassToFront.push(element)
                }
            });
        }
    })
    return arrayPassToFront
}

exports.completedJobs = () => {

}

// let arrayToFront = []
// loggedusers.forEach(val => {
//     if(val._id == req.body.user) {
//         jobArray.forEach(element => {
//             if(element.email == val.email) {
//                 arrayToFront.push(element)
//             }
//         });
//     }
// });