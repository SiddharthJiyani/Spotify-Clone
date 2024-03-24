const express = require("express");
const router = express.Router();
const {register} = require("../controllers/Auth") ;
const {login} = require("../controllers/Auth");
const passport = require("passport");
const { auth } = require("../middleware/auth");
const User = require("../models/User");

// this should have been in controller
router.post("/register",register )
router.post("/login", login ) ;
router.get("/get/profile",auth, async (req, res) => {
    try{
        console.log("req : ",req.user)
        const currentUser = req.user;
        const artistId = req.user.id ;
        const artist = await User.findById(artistId) ;
        console.log("artist : ", artist);
        console.log("currentUser : ", req.user);
        return res.status(200).json({
            success : true ,
            message : "Profile details fetched successfully" ,
            data :  artist
        })
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Failed to get profile details"
        })
    }
});

module.exports = router ; 