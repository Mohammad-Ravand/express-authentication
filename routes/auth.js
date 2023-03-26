var express = require("express");
var router = express.Router();
const config = require('config');
const { csrf_verify } = require("../utils/config");
/* GET show login page */
router.get('/', function (req, res, next) {
    res.render('login');
});

/* GET show login page */
router.get(config.routes.auth.login_create, function (req, res, next) {
    res.render('login');
});

/* POST show login page */
router.post(config.routes.auth.login_post, csrf_verify,function (req, res, next) {
  res.send("post login user");
});

/* GET show register page */
router.get(config.routes.auth.register_create, function (req, res, next) {
  res.render('register');
});

/* POST show register page */
router.post(config.routes.auth.register_post, function (req, res, next) {
  res.send("post register user");
});

module.exports = router;
