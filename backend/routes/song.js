const express = require ("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");
router.post("/create",passport.authenticate("jwt",{session:false}), async (req,res)=>{
         const {name,thumbnail,track} = req.body;
         if(!name || !thumbnail || !track){
            return res
                  .status(301)
                  .json({err:"Insufficient details to create a song"});
         }
         const artist =req.user._id;
         const songDetails = {name,thumbnail,track,artist};
         const createdSong = await Song.create(songDetails);
         res.status(200).json(createdSong);
});

router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),async(req,res)=>{
      const currentUser = req.user;
      const songs = await Song.find({artist : req.user._id}).populate("artist"); 
      return res.status(200).json({data : songs});
})

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {artistId} = req.params;
    const songs = await Song.find({artist : artistId}); 
    const artist = await User.findOne({_id:artistId});
    if(!artist){
        res.status(301).json({err:"Artist does not exist"});
    }
    return res.status(200).json({data : songs});
})

router.get("/get/songName/:songName",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {songName} = req.params;
    const songs = await Song.find({name:songName}).populate("artist");
    return res.status(200).json({data : songs});
})


router.delete("/delete/:songId",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {songId} = req.params;
    if(!songId){
        return res.status(301).json({err:"Insufficient Data"});
    }
    const song = await Song.findByIdAndDelete(songId);
    if(!song){
        return res.status(301).json({err:"Invalid Song Id"});
    }
    return res.status(200).json({message:"Song Deleted"});
})

router.patch("/like/:songId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { songId } = req.params;

    if (!songId) {
        return res.status(301).json({ err: "Insufficient Data" });
    }

    try {
        const song = await Song.findById(songId);
        const index = song.likes.findIndex(id => id === String(req.user._id));

        if (index === -1) {
            song.likes.push(req.user._id);
        } else {
            song.likes = song.likes.filter(id => id !== String(req.user._id));
        }

        const updatedSong = await song.save(); // Save the changes made to the song

        return res.json(updatedSong);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: "Server Error" });
    }
});


// router.patch("/like/:songId",passport.authenticate("jwt",{session:false}),async(req,res)=>{
//     const {songId} = req.params;

//     if(!songId){
//         return res.status(301).json({err:"Insufficient Data"});
//     }

//     const song = await Song.findById(songId);
//     const index = Song.likes.findIndex((id)=>id===String(req.user._id));

//     if (index === -1) {
//         Song.likes.push(req.user._id);
//     } else {
//         Song.likes = Song.likes.filter((id) => id !== String(req.user._id));
//     }

//     const updatedPost = await Song.findByIdAndUpdate(id, post, { new: true });

//     return res.json(updatedPost);

//    })

   router.post("/comment/:songId",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {songId} = req.params;
    const {comment} = req.body;
    if(!songId || !comment){
        return res.status(301).json({err:"Insufficient Data"});
    }
    const post = await Song.findById(songId);
    if (!post) {
        return res.status(404).json({ err: "Song not found" });
    }    
    
    post.comments.push(comment);
    const updatedPost = await Song.findByIdAndUpdate(songId, post, { new: true });
    res.json(updatedPost);
   })

module.exports = router;