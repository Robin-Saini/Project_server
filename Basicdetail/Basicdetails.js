const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");
const bp = require('body-parser');
const { request } = require('express');
const cors = require('cors')
// const app = require('express')

router.use(bp.json)
router.use(bp.urlencoded({ extended: true }))

const userbasicSchema = new mongoose.Schema({
    pan: String,
    email: String,
    firstname:String,
    middlename: String,
    lastname: String,
    fathername: String,
    mobilenumber: String,
    aadharnum: String,
});

router.get("/userbasicdetails",(res,req) =>{
    req.send("your in userbasicdetails")
})

const basicdata = new mongoose.model("basicUser", userbasicSchema)

console.log(request.body)
router.post("/userbasicdetails",(res,req) =>{
  console.log(req.body)
   const {pan,email,firstname,middlename,lastname,fathername,mobilenumber,aadharnum}  = req.body;
    const user = new basicdata({ pan,email,firstname,middlename,lastname,fathername,mobilenumber,aadharnum})
    user.save(err=>{
        if(err){
            res.send(err)
        }else{
            res.send({message:"sucessfull"})
        }
    }
      )
})

module.exports = router