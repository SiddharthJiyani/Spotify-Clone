const express = require("express");
const router = express.Router();
const User = require("../models/User") ;
const bcrypt = require("bcryptjs") ;
const {getToken} = require("../utils/helpers") ;
require("dotenv").config() ;
const jwt = require('jsonwebtoken');




exports.register = async (req,res) => {
    try{

        //This code will run when the /register is called with POST method

        // fetch data
        console.log(req.body);
        const {email , username , firstName , lastName , password} = req.body ;

        // TODO: Add confirm password later

        // validation
        if(!email || !username || !firstName || !lastName || !password){
            console.log(email , username , firstName , lastName , password);
            return res.status(402).json({
                success : false ,
                message : "Please enter all fields"
            })
        }

        // Check if user already exists
        const user = await User.findOne({email}) ;
        if(user){
            return res.status(403).json({
                success : false ,
                message : "User already exists , Please Login"
            })
        }

        
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword : ", hashedPassword);
        

        // create new user in db ( db entry )
        const newUserData = new User({
            email ,
            username ,
            password : hashedPassword,
            firstName ,
            lastName ,
        })

        // await newUser.save()

        // OR

        const newUser = await User.create( newUserData )

        console.log("New User data : ", newUserData ) ;
        console.log("New User created : ", newUser) ;

        // jwt token : return token to user
        const token = getToken(email, newUser) ;
        // console.log("token : " ,token);
        
        // return response
        const userToReturn = {...newUser.toJSON() ,  token};
        delete userToReturn.password ;
        res.status(201).json({
            success : true ,
            message : "User created successfully",
            newUser : userToReturn ,
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message : "REGISTRATION FAILED"
        })
    }
}


exports.login = async ( req , res)=>{
    
    try{
        // fetch data from req body
        const {email , password} = req.body ;

        // validation
        if(!email || !password){
            return res.status(402).json({
                success : false ,
                message : "Please enter all fields"
            })
        }

        // check if user exists
        let user =await User.findOne({email}) ;
        if(!user){
            return res.status(403).json({
                success : false ,
                message : "User does not exist , Please Register"  
            }) 
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            //generate JWT token after matching password and compare password
            const payload = {
                email : user.email,
                id : user._id
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "1d"}) ;
            // const token = getToken(user.email, user) ;
            // const userToReturn = {...user.toJSON() ,  token};
            // OR
            user = user.toObject() ;
            user.token = token ;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 2*24*60*60*1000) ,
                // httpOnly : true , 
                // httpOnly is a flag for cookies that makes them inaccessible via JavaScript running in the browser. This means that the cookie cannot be accessed through client-side script. This is an important security setting that can help to prevent the cookie data from being exposed to cross-site scripting (XSS) attacks.
                secure : true ,
                sameSite : "none"
            }

            // add user to req.user
            req.user = user ;

            console.log("req.user : ", req.user);

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            });

            console.log(user)
            // return res
            
            // ! Dont do this 
            // return res.status(201).json({
            //     success : true ,
            //     message : "Logged in successfully",
            //     newUser : user ,
            // })
        }

        else{
            return res.status(403).json({
                success : false ,
                message : "Invalid Credentials"
            })
        }
    }

    catch(err){
        console.log(err)
        res.status(500).json({
            message : "LOGIN FAILED"
        })
    }


}