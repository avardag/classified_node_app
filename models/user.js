const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
  email: String,
  image: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);


module.exports = User;