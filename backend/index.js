const express = require("express");
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/User");
const passport = require("passport");
const app = express();
app.use(express.json());
require("dotenv").config();
require("dotenv").config();
const port =8000;

const cors = require("cors");
app.use(cors());

mongoose.connect("mongodb+srv://ppp:" + process.env.MONGO_PASSWORD + "@pk.adpbrza.mongodb.net/music_review"
).then((x)=>{
     console.log("Connected to mongodb");
}).catch((err)=>{
    console.log("Error while Connecting", err);
    
});

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({ _id: jwt_payload.identifier});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}));


app.get("/",(req,res)=>{
      res.send("hello");
})


app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);
app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});