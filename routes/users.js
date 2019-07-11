const express = require('express');
const router = express.Router();
const passport = require('passport');
const { postRegister } = require('../controllers/users.js')
const { errorHandler } = require('../middleware/users')
//USER Routes

/* GET /register  */
router.get('/register', (req, res, next) => {
  res.send("GET /register")
});

/* POST /register  */
// router.post('/register', postRegister);
router.post('/register', errorHandler(postRegister));

/* GET /login  */
router.get('/login', (req, res, next) => {
  res.send("GET /login")
});

/* POST /login  */
router.post('/login', passport.authenticate('local',
  {
    successRedirect: "/",
    failureRedirect: '/users/login'
  }
));

/* GET /logout  */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

/* GET /profile  */
router.get('/profile', (req, res, next) => {
  res.send("GET /profile")
});

/* PUT /profile/:user_id  */
router.put('/profile/:user_id', (req, res, next) => {
  res.send("PUT /profile/:user_id")
});

/* GET /forgot-pw  */
router.get('/forgot-pw', (req, res, next) => {
  res.send("GET /forgot-pw")
});

/* PUT /forgot-pw  */
router.put('/forgot-pw', (req, res, next) => {
  res.send("PUT /forgot-pw")
});

/* GET /reset-pw/:token  */
router.get('/reset-pw/:token', (req, res, next) => {
  res.send("GET /reset-pw/:token")
});

/* PUT /reset-pw/:token  */
router.put('/reset-pw/:token', (req, res, next) => {
  res.send("PUT /reset-pw/:token")
});

module.exports = router;
