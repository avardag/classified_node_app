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
  ],
  avgRating: {
    type: Number,
    default: 0
  },
})
postSchema.pre('remove', async function(){ //not => to geta acces to lexcal THIS
  await Review.remove({
    _id:{
      $in: this.reviews
    }
  })
})

postSchema.methods.calculateAvgRating = function () {
  let ratingTotal = 0;
  if (this.reviews.length > 0) { //if there are reviews
    this.reviews.forEach(review => {
      ratingTotal += review.rating;
    });
    this.avgRating = Math.round((ratingTotal / this.reviews.length) * 10) / 10;
  } else { //there are no reviews
    this.avgRating = ratingTotal; // i.e 0
  }
 
  const floorRating = Math.floor(this.avgRating);
  this.save(); //save the post

  return floorRating;
}
postSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;