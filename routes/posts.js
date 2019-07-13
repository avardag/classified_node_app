const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware/users")
const { 
    postIndex, 
    postNew, 
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDestroy
  } = require("../controllers/posts")

/* GET posts index /posts. */
router.get('/', asyncErrorHandler(postIndex));

/* GET - new post page - /posts/new. */
router.get('/new', postNew);

/* POST - create - /posts */
router.post('/', asyncErrorHandler(postCreate) );

/* GET - show - /posts/:id. */
router.get('/:id', asyncErrorHandler(postShow));

/* GET - edit - /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT - posts update - /posts/:id */
router.put('/:id', asyncErrorHandler(postUpdate));

/* DELETE - posts destroy - /posts/:id */
router.delete('/:id', asyncErrorHandler(postDestroy));

module.exports = router;


// GET index        /posts
// GET new          /posts/new
// POST create      /posts
// GET show         /posts/:id
// GET edit         /posts/:id/edit
// PUT update       /posts/:id
// DELETE update    /posts/:id