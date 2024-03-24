const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createPlaylist,getPlaylistById ,getPlaylistByArtist, addSongToPlaylist, getPlaylistByMe,demoApi} = require("../controllers/Playlist");
const { auth } = require("../middleware/auth");

// create a playlist
router.post("/create", auth, createPlaylist);

router.get("/demoAPI", auth, demoApi);

// get all playlists of a user
router.get("/get/MyPlaylist", auth, getPlaylistByMe);

// get playlist by id
router.get("/get/playlist/:playlistId", auth, getPlaylistById);


// get all playlists of a artist
router.get("/get/artist/:artistId", auth, getPlaylistByArtist);


// add a song to a playlist
router.post("/add/song" , auth , addSongToPlaylist ) ;

module.exports = router;