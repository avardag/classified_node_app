const Review = require("../models/review");

module.exports = {
  asyncErrorHandler: (fn)=> {
    return (req, res, next)=>{
      Promise
        .resolve(fn(req, res, next))
        .catch(next)
    }
  },
  isReviewAuthor: async (req, res, next)=>{
    let review = await Review.findById(req.params.review_id);
    if(review.author.equals(req.user._id)){
      return next()
    }
    req.session.error = "Not authorized to edit this review"
    return res.redirect("/posts")
  }
}