const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  images: [ String ],
  location: String,
  lat: Number,
  lng: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;