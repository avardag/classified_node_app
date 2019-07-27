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
  //GeoJson
  geometry:{
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  //geoJson properties
  properties: {
    description: String
  },
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

//geoJson sample
/*
{
"type": "FeatureCollection",
"features": [
    {
    "geometry": {
      "type": "Point",
      "coordinates": [
          -76.9750541388,
          38.8410857803
      ]
    },
    "type": "Feature",
    "properties": {
      "description": "Southern Ave",
      "marker-symbol": "rail-metro",
      "title": "Southern Ave",
      "url": "http://www.wmata.com/rider_tools/pids/showpid.cfm?station_id=107",
      "lines": [
          "Green"
      ],
      "address": "1411 Southern Avenue, Temple Hills, MD 20748"
    }
    },
  ]
}
*/