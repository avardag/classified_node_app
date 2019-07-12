const express = require('express');
const router = express.Router();
const { errorHandler } = require("../middleware/users")
const { getPosts } = require("../controllers/posts")

/* GET posts index /posts. */
router.get('/', errorHandler(getPosts));

/* GET - new post page - /posts/new. */
router.get('/new', (req, res, next) => {
  res.send("NEW /posts/new")
});

/* POST - create - /posts */
router.post('/', (req, res, next) => {
  res.send("POST(create) /")
});

/* GET - show - /posts/:id. */
router.get('/:id', (req, res, next) => {
  res.send("SHOW /posts/:id")
});

/* GET - edit - /posts/:id/edit */
router.get('/:id/edit', (req, res, next) => {
  res.send("EDIT /posts/:id/edit")
});

/* PUT - posts update - /posts/:id */
router.put('/:id', (req, res, next) => {
  res.send("PUT /posts/:id")
});

/* DELETE - posts destroy - /posts/:id */
router.delete('/:id', (req, res, next) => {
  res.send(" DELETE /posts/:id")
});


module.exports = router;


// GET index        /posts
// GET new          /posts/new
// POST create      /posts
// GET show         /posts/:id
// GET edit         /posts/:id/edit
// PUT update       /posts/:id
// DELETE update    /posts/:id