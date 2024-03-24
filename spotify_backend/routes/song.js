const express = require("express");
const router = express.Router();
const {createSong , getMySongs , getSongByArtist , getSongByName , addLike,removeLike,getLikedSongs} = require("../controllers/Song") ;
const passport = require("passport");
const { auth } = require("../middleware/auth");

router.post("/createSong",auth ,createSong)
// jwt is the default name for the strategy we created in index.js of passport
// passport.authenticate("jwt") -> why ?  because we want to make sure that only logged in users can create a song

router.get("/get/mysongs" , auth,  getMySongs )

router.get("/get/artist/:artistId" , auth,  getSongByArtist) 
// :artistId is a dynamic parameter -> we will get it from req.params.artistId -> we will get it from the url

router.get("/get/songname/:songName" , auth,  getSongByName)

router.post("/like/:songId" , auth,  addLike)

router.post("/unlike/:songId" , auth,  removeLike)

router.get("/get/likedSongs" , auth,  getLikedSongs)

module.exports = router ; 