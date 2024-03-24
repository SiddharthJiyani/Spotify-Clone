const express = require("express");
const router = express.Router();
const User = require("../models/User") ;
const bcrypt = require("bcryptjs") ;
const {getToken} = require("../utils/helpers") ;
const Song = require("../models/Song") ;

exports.createSong = async ( req , res ) => {
    // due to the passport.authenticate("User") , we have access to req.user

    try{
        // fetch data
        const{ name , thumbnail , track} = req.body ;
        // console.log("req... : ", req.user);
        const artist = req.user.id ;
        console.log("artist : ", artist) ;

        // validation
        if(!name || !thumbnail || !track){
            return res.status(402).json({
                success : false ,
                message : "Please enter all fields"
            })
        }

        const newSongData = new Song({
            name ,
            thumbnail ,
            track ,
            artist ,
        })

        const newSong = await Song.create( newSongData ) ;
        // const songDetails = {name , thumbnail , track , artist} ;
        // const newSong = await Song.create(songDetails)
        console.log("New Song data : ", newSong ) ;

        // return res
        return res.status(201).json({
            success : true ,
            message : "Song uploaded successfully" ,
            data : newSong
        })
    } 

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Song upload failed"
        })
    } 
}

exports.getMySongs = async (req,res) => {
    try{
        const currentUser = req.user;
        // we need to get all the songs where artistId == currentUser._id

        console.log("currentUser : ", currentUser);
        const songs = await Song.find({artist : currentUser.id}).populate("artist") ;
        // console.log("Songs : ", songs) ;
        return res.status(200).json({
            success : true ,
            message : "Fetched songs successfully" ,
            data : songs
        })

    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Failed to fetch songs" 
        })
    }
}

exports.getSongByArtist = async (req,res) => {

    try{

        const {artistId} = req.params;
        console.log("artistId : ", artistId) ;
        console.log("{artistId} : ", {artistId}) ;

        // check if artist exists or not
        const artist = await User.findById({_id: artistId}).populate("artist") ;
        if(!artist){
            return res.status(301).json({
                success : false ,
                message : "Artist not found"
            })
        }
    
    
        const songs = await Song.find({artist : artistId}) ;
    
        console.log("Songs : ", songs) ;
    
        return res.status(200).json({
            success : true ,
            message : "Songs fetched successfully" ,
            data : songs
        })
    
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Failed to fetch songs"
        })
    }
} 

exports.getSongByName = async (req,res) => {
    const {songName}  = req.params ;

    // const songs = await Song.find({name : songName}) ;
    // add patten matching instead of exact match ? -> how ? : use regex-> regular expressions 
    const songs = await Song.find({name : { $regex : songName , $options : "i"}}).populate("artist") ;

    return res.status(200).json({
        success : true ,
        message : "Songs fetched successfully" ,
        data : songs
    })
}

exports.addLike = async (req,res) => {
    const {songId} = req.params ;
    const userId = req.user.id ;

    try{
        // check if song exists or not
        const song = await Song.findById({_id : songId}) ;
        if(!song){
            return res.status(301).json({
                success : false ,
                message : "Song not found"
            })
        }

        // check if user has already liked the song or not
        const isLiked = song.likes.includes(userId) ;
        if(isLiked){
            return res.status(301).json({
                success : false , 
                message : "You have already liked the song"
            })
        }

        // add like
        song.likes.push(userId) ;
        await song.save() ;

        return res.status(200).json({
            success : true ,
            message : "Song liked successfully" ,
            data : song
        })
    }
    
        catch(e){
            console.log(e);
            return res.status(500).json({
                success : false ,
                message : "Failed to like the song"
            })
        }
}

exports.removeLike = async (req,res) => {
    const {songId} = req.params ;
    const userId = req.user.id ;

    try{
        // check if song exists or not
        const song = await Song.findById({_id : songId }) ;
        if(!song){
            return res.status(301).json({
                success : false ,
                message : "Song not found"
            })
        }

        // check if user has already liked the song or not
        const isLiked = song.likes.includes(userId) ;
        if(!isLiked){
            return res.status(301).json({
                success : false ,
                message : "You have not liked the song"
            })
        }

        // remove like
        song.likes = song.likes.filter(like => like != userId) ;
        await song.save() ;

        return res.status(200).json({
            success : true ,
            message : "Song unliked successfully" ,
            data : song
        })
    }
        
            catch(e){
                console.log(e);
                return res.status(500).json({
                    success : false ,
                    message : "Failed to unlike the song"
                })
            }
}

exports.getLikedSongs = async (req,res) => {
    const userId = req.user.id ;

    try{
        const songs = await Song.find({likes : userId}).populate("artist") ;
        return res.status(200).json({
            success : true ,
            message : "Liked songs fetched successfully" ,
            data : songs
        })
    }

    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false ,
            message : "Failed to fetch liked songs"
        })
    }
}


/**
 // Like a song
exports.likeSong = async (req, res) => {
  try {
    // Assume user ID is in req.user._id and song ID is in req.params.songId
    const song = await Song.findById(req.params.songId);
    if (!song.likes.includes(req.user._id)) {
      song.likes.push(req.user._id);
      await song.save();
    }
    res.status(200).json({ message: 'Song liked' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while liking the song' });
  }
};

// Unlike a song
exports.unlikeSong = async (req, res) => {
  try {
    // Assume user ID is in req.user._id and song ID is in req.params.songId
    const song = await Song.findById(req.params.songId);
    const index = song.likes.indexOf(req.user._id);
    if (index !== -1) {
      song.likes.splice(index, 1);
      await song.save();
    }
    res.status(200).json({ message: 'Song unliked' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while unliking the song' });
  }
}; 

 */