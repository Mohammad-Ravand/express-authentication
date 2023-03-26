var express = require('express');
const { logged_in_validation } = require('../validation/post/authValidation');
var router = express.Router();

/* GET home page. */
router.get('/',logged_in_validation, function(req, res, next) {
  res.render('index', { title: 'Home Page' ,user: req.session.user});
});

module.exports = router;
