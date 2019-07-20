const Post = require("../models/post");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MBX_ACCESS_TOKEN });
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: 'micober',
  api_key: '945373752449394',
  api_secret: process.env.CLOUDINARY_SECRET
});

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
    req.body.post.images=[]; //empty array to be filled with uploads
    // iterate over req.files & upload 1 by 1
    for (const file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      // fill req.body.post.images w/ urls of uploaded images
      req.body.post.images.push({
        url: image.secure_url,
        public_id: image.public_id
      })
    }
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.post.location,
        limit: 1
      })
      .send()
    // assign coordinates arr got from geoCoding to req.body object
    req.body.post.coordinates = response.body.features[0].geometry.coordinates
    //use req.body to create new post
    let newPost = await Post.create(req.body.post);
    req.session.success = "Post created successfully!"
    res.redirect(`/posts/${newPost.id}`)
  },
  /* GET - show - /posts/:id. */
  async postShow(req, res, next){
    let post = await Post.findById(req.params.id)
      .populate({ //join reviews table
        path:'reviews',
        options: { sort: { '_id': -1 } },
        populate:{ //join users collection for review authorss
          path: 'author',
          model: 'User'
        }
      });
    res.render("posts/show", { post })
  },
  /* GET - edit - /posts/:id/edit */
  async postEdit(req, res, next){
    let post = await Post.findById(req.params.id);
    res.render("posts/edit", { post })
  },
  /* PUT - posts update - /posts/:id */
  async postUpdate(req, res, next){
    //find post to be updated by its id
    let post = await Post.findById(req.params.id);
    //check if theres images to be deleted
    //comes from form : <input type="checkbox" name="deleteImages[] ......" 
    if (req.body.deleteImages && req.body.deleteImages.length) {
      //loop over deleteImages
      for (const imagePublic_id of req.body.deleteImages) {
        // delete images from cloudinary
        await cloudinary.v2.uploader.destroy(imagePublic_id);
        //delete image from post's images array
        for (const img of post.images) {
          if (img.public_id === imagePublic_id) {
            let index = post.images.indexOf(img)
            post.images.splice(index, 1)
          }
        }
      }
    }
    //check if theres images to be uploaded
    if(req.files){
      // iterate over req.files & upload 1 by 1
      for (const file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        // add images to post.images array
        post.images.push({
          url: image.secure_url,
          public_id: image.public_id
        })
      }
    }
    //check if location was updated in edit form
    if (req.body.post.location !== post.location) { //post.location -> from DB
      let response = await geocodingClient
        .forwardGeocode({
          query: req.body.post.location,
          limit: 1
        })
        .send()
      // assign coordinates arr got from geoCoding to req.body object
      post.coordinates = response.body.features[0].geometry.coordinates
      post.location = req.body.post.location;
    }
    //update the post with new(or exisitng in edit form) values
    post.title = req.body.post.title;
    post.description = req.body.post.description;
    post.price = req.body.post.price;
    // save the updated post
    post.save();
    //when all done, redirect to show page
    res.redirect(`/posts/${post.id}`)
  },
  /* DELETE - posts destroy - /posts/:id */
  async postDestroy(req, res, next){
    let postToDelete = await Post.findById(req.params.id);
    for(const image of postToDelete.images){
      await cloudinary.v2.uploader.destroy(image.public_id);
    }
    await postToDelete.remove();
    //redirect after images of the post deleted from cloudinary and post itsef deleted
    res.redirect('/posts')
  }
}