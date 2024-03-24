const express = require("express");
const router = express.Router();
const User = require("../models/User") ;
const bcrypt = require("bcryptjs") ;
const {getToken} = require("../utils/helpers") ;
const Song = require("../models/Song") ;
const Playlist = require("../models/Playlist") ;


exports.demoApi = async(req,res) => {
    console.log("entered demoApi");
    return res.status(200).json({
        success : true ,
        message : "Demo API"
    })

}

exports.getPlaylistByMe = async (req,res) => {
    try{
        console.log("entered getPlaylistByMe")
        const artistId = req.user.id ;
        console.log("artistId : ", artistId);
        const playlists = await Playlist.find({artist : artistId}).populate("songs").populate("artist");
        console.log("Playlists : ", playlists) ;
        
        // validation
        if(!playlists){
            return res.status(404).json({
                success : false ,
                message : "Playlists not found"
            })
        }

        return res.status(200).json({
            success : true ,
            message : "Playlists fetched successfully" ,
            data : playlists
        })
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Playlist fetch failed"
        })
    }
}


exports.createPlaylist = async (req,res) => {
    try{
        const currentUser = req.user ;
        const {name , thumbnail , songs}  = req.body ;
    
        // validation
        if(!name || !thumbnail ){
            return res.status(402).json({
                success : false ,
                message : "Please enter all fields"
            })
        }
    
        const playlistData = {
            name ,  
            thumbnail , 
            songs ,
            artist : currentUser.id ,
            collaborators : [] 
        } 
    
        const newPlaylist = await Playlist.create(playlistData) ;
        console.log("New Playlist : ", newPlaylist) ;

        return res.status(201).json({
            success : true ,
            message : "Playlist created successfully" ,
            data : newPlaylist
        })
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Playlist creation failed"
        })
    }
}

exports.getPlaylistById = async (req,res) => {
    try{
        const playlistId = req.params.playlistId ;
        const playlist = await Playlist.findOne({_id : playlistId}).populate(
            {
                path : "songs",
                populate : {
                    path : "artist"
                }
            }
        ).populate("collaborators"
        ) ;
        console.log("Playlist : ", playlist) ;

        // validation   
        if(!playlist){
            return res.status(404).json({
                success : false ,
                message : "Playlist not found"
            })
        }

        return res.status(200).json({
            success : true ,
            message : "Playlist fetched successfully" ,
            data : playlist
        })
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Playlist fetch failed"
        })
    }
}

exports.getPlaylistByArtist = async (req,res) => {
    try{
        const artistId = req.params.artistId ;
        const artist = await User.findOne({_id : artistId}) ;

        if(!artist){
            return res.status(404).json({
                success : false ,
                message : "Artist not found...Invalid artist Id"
            })
        }

        const playlists = await Playlist.find({artist : artistId}).populate("songs").populate("owner").populate("collaborators") ;
        console.log("Playlists : ", playlists) ;
        
        // validation
        if(!playlists){
            return res.status(404).json({
                success : false ,
                message : "Playlists not found"
            })
        }

        return res.status(200).json({
            success : true ,
            message : "Playlists fetched successfully" ,
            data : playlists
        })
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Playlist fetch failed"
        })
    }
}

exports.addSongToPlaylist = async (req,res) => {
    try{
        const currentUser = req.user ;
        const {playlistId , songId} = req.body ;  
        const playlist = await Playlist.findOne({_id : playlistId}) ;  
    
        // validation 
        if(!playlist){
            return res.status(404).json({
                success : false ,
                message : "Playlist not found"
            })
        }
    
        // check if currentUser owns a playlist or is one of the collaborators
        console.log("playlist.owner : ", playlist.artist) ;
        console.log("currentUser._id : ", currentUser._id) ;
        console.log("playlist.collaborators : ", playlist.collaborators) ;
        console.log(playlist.owner != currentUser._id);
        // ^We can't compare two objects directly in JS , so we need to convert them to JSON and then compare
        if(JSON.stringify(playlist.owner) != JSON.stringify(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
            return res.status(403).json({
                success : false ,
                message : "You are not authorized to add songs to this playlist"
            })
        }
    
        // check if song exists
        const song = await Song.findOne({_id : songId}) ;
        if(!song){
            return res.status(404).json({
                success : false ,
                message : "Song not found"
            })
        }
    
        // check if song already exists in playlist
        if( playlist.songs.includes(songId)){
            return res.status(403).json({
                success : false ,
                message : "Song already exists in playlist"
            })
        }
    
        //add song to playlist
        playlist.songs.push(songId) ;
    
        // save playlist changes in db
        await playlist.save() ;
        // any alternative to save() ? -> updateOne() , updateMany() , update() , findOneAndUpdate()
        // like : await playlist.updateOne({$push : {songs : songId}}) ;
    
        return res.status(200).json({
            success : true ,
            message : "Song added to playlist successfully" ,
            data : playlist
        })
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Playlist fetch failed"
        })
    }
}
