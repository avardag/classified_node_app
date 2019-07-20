const Post = require("../models/post");
const Review = require("../models/review");

module.exports = {
  /* POST - reviews create - /posts */
  async reviewCreate(req, res, next){
    //find a post by its ID
    let post = await Post.findById(req.params.id)
    //create a review
    req.body.review.author = req.user._id;
    let newReview = await Review.create(req.body.review);
    //asign new review to the post
    post.reviews.push(newReview)
    // save the post
    post.save();
    //set a flash message
    req.session.success = 'Thank you for your review'
    // redirect to the post
    res.redirect(`/posts/${post.id}`)

  },
 
  /* PUT - reviews update - /reviews/:id */
  async reviewUpdate(req, res, next){
    await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
    req.session.success = "Review updated successfully!"
    res.redirect(`/posts/${req.params.id}`)
  },
  /* DELETE - reviews destroy - /reviews/:id */
  async reviewDestroy(req, res, next){

  }
}