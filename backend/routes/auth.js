const express = require("express");
const jwt = require("jsonwebtoken")
const router = express();//auth mai app ki jarurat nhi , app mai use,listen vagera waste hai joh sirf index mai kaam ata hai
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
router.use(express.json());

router.post("/register",async (req,res)=>{
    const {email,password,firstName,lastName} = req.body;

    const user = await User.findOne({email : email});

    if(user){
        return res.status(403).json({ error:"User with this email already exist"});
    }
    
    //store password in hashed
    const hashedPassword = await bcrypt.hash(password,10);
    const newUserData = {email,password : hashedPassword,firstName,lastName};
    const newUser = await User.create(newUserData);

    const token = await getToken(newUser.email,newUser);

    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email : email});

    if(!user){
        return res.status(403).json({ error:"Invalid credentials"});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }   
    
    const token = await getToken(user.email,user);
    const userToReturn = {...user.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;