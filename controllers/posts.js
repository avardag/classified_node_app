const Post = require("../models/post");

module.exports = {
  //Posts index : GET /posts
  async postIndex(req, res, next){
    let posts = await Post.find({});
    res.render("posts/index", { posts });
  },
  // GET - renders post form - /posts/new
  postNew(req, res, next){
    res.render("posts/new")
  },
  /* POST - create - /posts */
  async postCreate(req, res, next){
    //use req.body to create new post
    let newPost = await Post.create(req.body.post);
    res.redirect(`/posts/${newPost.id}`)
  },
  /* GET - show - /posts/:id. */
  async postShow(req, res, next){
    let post = await Post.findById(req.params.id);
    res.render("posts/show", { post })
  },
  /* GET - edit - /posts/:id/edit */
  async postEdit(req, res, next){
    let post = await Post.findById(req.params.id);
    res.render("posts/edit", { post })
  },
  /* PUT - posts update - /posts/:id */
  async postUpdate(req, res, next){
    let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
    res.redirect(`/posts/${post.id}`)
  },
  /* DELETE - posts destroy - /posts/:id */
  async postDestroy(req, res, next){
    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/posts')
  }
}