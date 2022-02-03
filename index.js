const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config')
const Register = require('./RegisterUpandLogin/Register');
const Login = require("./RegisterUpandLogin/Login")
// const basicuserdetails = require("./Basicdetail/Basicdetails")
const GoogleLogin = require('./SocialLogin/GoogleLogin')



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cors());
// app.use(GoogleLogin)
app.use(Register);
app.use(Login);
// app .use(basicuserdetails)



mongoose.connect("mongodb+srv://Robin:robin890@cluster0.pjqqt.mongodb.net/myFirstDatabase?retryWrites=true",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
}

const mserSchema = new mongoose.Schema({
    name : String,
    email: String,
    accessToken: String,
    googleId: String,

})
// ( AccessToken && Email && GoogleId && name)
const User = new mongoose.model("NewUser", mserSchema)
app.post("/Googleuser",(req,res)=>{
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




const userbasicSchema = new mongoose.Schema({
    pan: String,
    email: String,
    firstname:String,
    middlename: String,
    lastname: String,
    fathername: String,
    mobilenumber: String,
    aadharnum: String,
    gender: String
});

// app.get("/userbasicdetails",(res,req) =>{
//     req.send("your in userbasicdetails")
// })

const basicdata = new mongoose.model("newbasicUser", userbasicSchema)

// console.log(request.body)
app.post("/userbasicdetails",(req,res)=>{
    console.log(req.body) 
    const {pan,email,firstname,middlename,lastname,fathername,mobilenumber,aadharnum,gender,birthdate}  = req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
    const user = new basicdata({ pan,email,firstname,middlename,lastname,fathername,mobilenumber,aadharnum,gender,birthdate})
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



app.get('/', (req, res) => {
    res.send("you are in user singup")
  })

app.listen(5000,()=>{
    console.log("started")
})
