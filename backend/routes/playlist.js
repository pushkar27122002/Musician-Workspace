const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), async(req, res) => {
  const currentUser = req.user;
  const {name,thumbnail,songs} = req.body;
  if(!name || !thumbnail || !songs){
    return res.status(301).json({ message: "Insufficient Data" });
  }
  const playlistData = {
    name,
    thumbnail,
    songs,
    owner : currentUser._id,
  };
  const playlist = await Playlist.create(playlistData);
  return res.status(200) .json( playlist );
});

router.get("/get/me",passport.authenticate("jwt",{session:false}) ,async(req, res) => {
  try {
    const  artistId  = req.user._id;
    console.log(artistId);
    const playlist = await Playlist.find({ owner: artistId}).populate("owner");
    
    // Send the playlist as a JSON response
    res.status(200).json(playlist);
} catch (error) {
    // Handle errors, such as database errors or errors during playlist retrieval
    console.error("Error while fetching playlist:", error);
    res.status(500).json({ error: "Internal server error" });
}
});

router.post("/add/song",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    const {playlistId,songId} = req.body;

    const playlist =  await Playlist.findOne({_id:playlistId});
    if(!playlist){
        return res.status(301).json({err:"Playlist Does not exist"});
    }
    if(!playlist.owner.equals(currentUser._id)){
        return res.status(400).json({err:"You are not authorized"});
    }

    const song  = await Song.findOne({_id:songId});
    if(!song){
        return res.status(301).json({err:"Song Does not exist"});
    }
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);
 });

module.exports = router;