const passport = require('passport');
const User = require("../models/user");

//Controller methods for routes
module.exports = {
  // POST users/register  */
  async postRegister(req, res, next){
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      image: req.body.image,      
    })
  //try catch errors will be caughte by errorHandler MW
  await User.register( newUser, req.body.password);
  res.redirect('/');
  },
  /* POST /users/login  */
  postLogin(req, res, next){
    passport.authenticate('local',
    {
      successRedirect: "/",
      failureRedirect: '/users/login'
    }
  )(req, res, next);
  },
  /* GET /logout  */
  getLogout(req, res, next){
    req.logout();
    res.redirect('/');
  }
}