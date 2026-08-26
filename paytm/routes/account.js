const express = require ("express")
const db = require ("../mongoose.js");
const Router = express.Router()
const mongoose = require ("mongoose")
const  { authmiddleware }= require ("../authmiddleware.js")

Router.get ("/balance",authmiddleware,async (req,res)=>{
    
    const session = await mongoose.startSession ();
    session.startTransaction();
    const account = await db.account.findOne(
        { userid : req.userid }
    ,{session})
       
    res.json({
        balance : account.balance
    })
     
})


Router.post("/transfer",authmiddleware,async(req,res)=>{
    const session = await mongoose.startSession ();
    session.startTransaction();

    const amount = req.body.amount
    const to = req.body.to

    // account
    const account = await db.account.findOne (
        {userid : req.userid},
        null
            ,{session}
    ) 

    if(!account){
        return res.status(403).json ({
        message : "account not found"
        })
    }
    //balance 
    if(account.balance < amount){
        return res.status(403).json ({
        message : "insufficent balance"
        })
    }
    // toaccount ,balance update
    const toAccount = await db.account.findOne (
         {userid : to }
         ,{session}
    )
    if(!toAccount){
       return res.status(403).json ({
        message : "account not found"
       })     
    }
    

        //balance update
    await db.account.updateOne (
        {
            userid : req.userid
        },{
            $inc : {
                balance : -amount 
            }
            },{session}
    )
    
    await db.account.updateOne (
        {
            userid : to
        },{
            $inc :{
            balance : amount
            }
        },{session}
    )
      await session.commitTransaction();
        session.endSession();

        return res.json({
            message: "Transfer successful"
        });
})

module.exports =
 Router;