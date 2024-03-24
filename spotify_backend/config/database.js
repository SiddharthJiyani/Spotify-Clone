const mongoose = require("mongoose") ;
require("dotenv").config() ;

const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser: true, 
        // useUnifiedTopology: true
    })
    .then(console.log("Connect to MongoDB successfully"))
    .catch((error)=>{
        console.log("Connect to MongoDB failed")
        console.log(error)
        process.exit(1) ;
    })
}

module.exports  = {connectDB}


