
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth=(req,res,next)=>{
    try{
        //extract jwt token

        // console.log("req:::",req);
        // console.log("cookie", req.cookies) ;  
        const authHeader = req.headers.authorization;
        // console.log("authHeader", authHeader) ;

        // const authHeader = req.headers['authorization'];
        // console.log("authHeader", authHeader) ;
        const token = authHeader && authHeader.split(' ')[1];
        // console.log("token", token) ;

        // const token = req.body.token || req.cookies.token /* || req.headers("Authorization").replace("Bearer ","")*/ ;
        // console.log("token--------------------------------------------------------------------------------------------")
        // console.log(token) ; 
        // console.log("token--------------------------------------------------------------------------------------------")
        
        if(!token){
            return res.status(401).json({
                success: false ,
                message : "No token found"
            })
            return next();
        }

        // verify token  
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET) ;
            // console.log("req.body--------------------------------------------------------------------------------------------")
            // console.log(req.body)
            // console.log("decode--------------------------------------------------------------------------------------------")
            // console.log(decode) ;
            req.user = decode ; // hamne req.user me payload store kr diya aur fir yaha se role milega aage
            // console.log("req.user--------------------------------------------------------------------------------------------")
            // console.log(req.user) ;
            next();
        }
        catch(e){
            console.log(e);
            return res.status(401).json({
                success: false ,
                message : "Invalid token.."
            }) 
        }
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false ,
            message : "Server Error"
        })
    }
}