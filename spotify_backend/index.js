const express = require("express");
const app = express() ;
const db = require("./config/database") ;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/User") ;
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const cors = require("cors") ;

app.use(cors()) ;
require("dotenv").config() ;

const port = process.env.PORT || 4000 ;

// middleware
app.use(express.json()) ;

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})


db.connectDB() ;


const cookieParser = require("cookie-parser") ;
app.use(cookieParser()) ;
app.use(express.json()) ; 
app.use(express.urlencoded({ extended: true }))

app.get("/", (req,res) => {
    res.send("<h1>This is HomePage baby..!</h1>")
})

app.use("/auth" , authRoutes) ;
app.use("/song" , songRoutes);
app.use("/playlist" , playlistRoutes) ;
