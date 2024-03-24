const express = require("express");
const app = express() ;
const db = require("./config/database") ;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
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

// //setup passport-jwt
// app.use(passport.initialize());
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_SECRET;

// passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
//     console.log("jwt_payload" ,  jwt_payload);
//     await User.findOne({id: jwt_payload.sub}, 
//     // User.findOne({id: jwt_payload.identifier},
//         // function(err, user) {
//         //     if (err) {
//         //         return done(err, false);
//         //     }
//         //     if (user) {
//         //         return done(null, user);
//         //     } else {
//         //         return done(null, false);
//         //         // or you could create a new account
//         //     }
//         // }

//         )
//         .then(user => {
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//                 // or you could create a new account
//             }
//         })
//         .catch(err => {
//             return done(err, false);
//         });
// }));

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