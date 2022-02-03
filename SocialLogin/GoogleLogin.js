const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");

const mserSchema = new mongoose.Schema({
    name : String,
    email: String,
    accessToken: String,
    googleId: String,

})
router.get("/Googleuserg",(res,req) =>{
    req.send("your in userbasicdetails")
})
// ( AccessToken && Email && GoogleId && name)
const User = new mongoose.model("GUser", mserSchema)
router.post("/Googleuser",(req,res)=>{
    console.log(req.body) 
    const {name,email,accessToken,googleId} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,email,accessToken,googleId})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })


}) 

