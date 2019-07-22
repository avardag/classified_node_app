const mongoose = require("mongoose");
const Review = require("./review");
const mongoosePaginate = require('mongoose-paginate');

const postSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  images: [ 
    {
      url: String,
      public_id: String
    }
   ],
  location: String,
  coordinates : Array,
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
postSchema.pre('remove', async function(){ //not => to geta acces to lexcal THIS
  await Review.remove({
    _id:{
      $in: this.reviews
    }
  })
})

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;