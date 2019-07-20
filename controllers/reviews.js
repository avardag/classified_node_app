const Post = require("../models/post");
const Review = require("../models/review");

module.exports = {
  /* POST - reviews create - /posts */
  async reviewCreate(req, res, next){
    //find a post by its ID
    let post = await Post.findById(req.params.id)
      .populate('reviews')//join review collections, to check if user alredy has a review
      .exec()
      //check if the user already has a review of this post
      let userReviews = post.reviews.filter((review)=>{
        return review.author.equals(req.user._id)
      });
      let hasReview = userReviews.length > 0 ? true: false;
      if(hasReview){
        req.session.error = 'Sorry, you can only create one review per post'
        return res.redirect(`/posts/${post.id}`);
      }
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
    //update revews arr of Post model by deleting the review
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.review_id }
    });
    //delete a review
    await Review.findByIdAndRemove(req.params.review_id);
    req.session.success = 'Review deleted'
    res.redirect(`/posts/${req.params.id}`)
  }
}