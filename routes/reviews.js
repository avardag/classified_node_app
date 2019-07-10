const express = require('express');
const router = express.Router({mergeParams: true});

/* GET reviews index /posts/:id/reviews */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Pin Shop - Home' });
  res.send("INDEX /reviews")
});

/* POST - create - /posts/:id/reviews */
router.post('/', (req, res, next) => {
  res.send("POST(create) /posts/:id/reviews")
});

/* GET - edit - /posts/:id/reviews/:reviews_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send("EDIT posts/:id/reviews/:reviews_id/edit")
});

/* PUT - reviews update - /posts/:id/reviews/:reviews_id */
router.put('/:review_id', (req, res, next) => {
  res.send("PUT /posts/:id/reviews/:reviews_id")
});

/* DELETE - reviews destroy - /posts/:id/reviews/:reviews_id */
router.delete('/:review_id', (req, res, next) => {
  res.send(" DELETE /posts/:id/reviews/:reviews_id")
});


module.exports = router;


// GET index        /reviews
// GET new          /reviews/new
// POST create      /reviews
// GET show         /reviews/:id
// GET edit         /reviews/:id/edit
// PUT update       /reviews/:id
// DELETE update    /reviews/:id