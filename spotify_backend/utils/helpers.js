const jwt = require('jsonwebtoken');
// const jwt = require('jwt');


exports.getToken = (email, user) => {
    const token = jwt.sign(
        {
            email,
            userId: user._id
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: "1h"}
    );
    return token;
}


module.exports = exports;