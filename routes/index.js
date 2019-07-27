const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/users')
const { landingPage } = require('../controllers/index')

/* GET home page. */
router.get('/', asyncErrorHandler(landingPage));


module.exports = router;
