const express = require('express');
const router = express.Router({mergeParams: true});
const {asyncErrorHandler, isReviewAuthor} = require('../middleware/users')
const { reviewCreate, reviewUpdate, reviewDestroy } = require("../controllers/reviews");

/* POST - create - /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT - reviews update - /posts/:id/reviews/:reviews_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE - reviews destroy - /posts/:id/reviews/:reviews_id */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(reviewDestroy));


module.exports = router;


// GET index        /reviews
// GET new          /reviews/new
// POST create      /reviews
// GET show         /reviews/:id
// GET edit         /reviews/:id/edit
// PUT update       /reviews/:id
// DELETE update    /reviews/:id