const mongoose = require('mongoose');

const Song = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    
    thumbnail:{
        type: String,
        required: true,
    },

    track:{
        type: String,
        required: true,
    },
    
    artist:{
        type: mongoose.Types.ObjectId,
        ref : "User" 
    },

    likes:[{
        type: mongoose.Types.ObjectId,
        ref : "User" 
    }]
    

});

module.exports = mongoose.model('Song', Song);