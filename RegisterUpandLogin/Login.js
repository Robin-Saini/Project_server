const express = require('express')
const router = express.Router();


router.get("/Login", (req, res) => {
    res.send("your in LOGIN")
  });


router.post("/Login",(req,res)=>{

    User.findone({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
})

module.exports = router