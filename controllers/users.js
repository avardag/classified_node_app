const User = require("../models/user");

module.exports = {
  async postRegister(req, res, next){
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      image: req.body.image,      
    })
  //try catch errors will be caughte by errorHandler MW
  await User.register( newUser, req.body.password);
  res.redirect('/');
  }
}