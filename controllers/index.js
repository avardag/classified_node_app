const passport = require('passport');
const Post = require("../models/post");

//Controller methods for routes
module.exports = {
  // GET /  landing page*/
  async landingPage(req, res, next){
    const posts = await Post.find({});
    res.render("index", { 
      posts, 
      MBXToken: process.env.MBX_ACCESS_TOKEN,
      title: 'Pin Shop - Home',
     })
  }
}