var Orders = require('../models/job-orders');

exports.getOrders=(req,res)=>{
    Orders.find({},(err,orders)=>{
      if(err){
        return res.send({error:err, status: false})
      }else{
        return res.send({ status: true,data:orders})

      }
    })
}