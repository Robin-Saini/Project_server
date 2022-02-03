const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");

const mserSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = new mongoose.model("User", mserSchema)
router.get("/Register", (req, res) => {
    res.send("your in signup")
  });
router.post("/Register",(req,res)=>{
    console.log(req.body) 
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })

    var hashedPassword = password;

 

    // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
    
        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, function (err, hash) {
    
            if (err) {
                return console.log('Cannot encrypt');
            }
    
            hashedPassword = hash;
            console.log(hash);
    
          bcrypt.compare(password, hashedPassword,
                async function (err, isMatch) {
    
            
                if (isMatch) {
                    console.log('Encrypted password is: ', password);
                    console.log('Decrypted password is: ', hashedPassword);
                }
    
                if (!isMatch) {
            
                    console.log(hashedPassword + ' is not encryption of '
                    + password);
                }
            })
         
        })
    })
   User.password = hashedPassword;


   const payload = {
    user: {
        id: User.id
    }
};
jwt.sign(
    payload,
    "randomString", {
        expiresIn: 10000
    },
    (err, token) => {
        if (err) throw err;
        res.status(200).json({
            token
        });
    }
);
}) 

module.exports = router;