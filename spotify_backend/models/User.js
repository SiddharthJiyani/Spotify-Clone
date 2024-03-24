const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
    },
    
    password:{
        type: String,
        required: true,
        private : true, 
    },
    email:{
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    likedSongs :{
        // We will change this to array later
        type:String,
        default: "",
    },
    likedPlaylists :{
        // We will change this to array later
        type:String,
        default: "",
    },

    subscribedArtist : {
        // We will change this to array later
        type:String,
        default: "",
    },


});

module.exports = mongoose.model('User', User);