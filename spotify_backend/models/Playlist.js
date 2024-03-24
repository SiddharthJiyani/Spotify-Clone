const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    
    thumbnail:{
        type: String,
        required: true,
    },
    
    artist:{
        type: mongoose.Types.ObjectId,
        ref : "User" 
    },

    // songs in the playlis and collaborate of playlist
    songs:[
        {
            type : mongoose.Types.ObjectId, 
            // instead of creating new entry for song we would rather populate it from song model
            ref : "Song"
        }
    ],

    collaborators:[
        {
            type : mongoose.Types.ObjectId, 
            ref : "User"
        }
    ]


});

module.exports = mongoose.model('Playlist', Playlist);