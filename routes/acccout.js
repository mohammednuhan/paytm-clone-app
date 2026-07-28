const express = require ("express")
const mongoose = require ("mongoose");
const Router = require(".");
const authmiddleware = require ("authmiddleware.js")
const account = reqiure ("./path-to-your-account-model")


Router.get ("/balance",authmiddleware,async (req,res)=>{

    const account = await db.acount.findone(
        userid = userid
    )
       
    res.json({
        balance : account.balance
    })
     
})


Router.post("/transfer",authmiddleware,async(req,res)=>{
    const amount = req.body.amount
    const to =req.body.amount

    // account
    const account = await db.account.findOne ({
        userid : userid
})

    if(!account){
        return res.status(403).json
        message : "account not found"
    }
    //balance 
    if(account ,balance < amount){
        return res.status(403).json
        message : "insufficent balance"
    }
    // toaccount ,balance update
    const toAccount = await db.toAccount.findOne ({
        userid : to 
    })
    if(!toAccount){
       return res.status(403).json
        message : "account not found"     
    }
    

        //balance update
    await db.account.updateOne ([
        {
            userid :req.userid
        },{
            balance : -amount 
        }
    ])
    
    await db.toAccount.updateOne ([
        {
            userid : req.userid 
        },{
            balance : amount
        }
    ])
})