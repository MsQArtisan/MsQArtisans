var Customer = require('../models/customer-model');

exports.getAllCustomers = (req, res) => {
    Customer.find((err, customer) => {
        console.log("customer details: ", customer);
        if(err){
            return res.send({error:err, status: false})
          }else{
            return res.send({ status: true,data:customer})
          }
    });
};
