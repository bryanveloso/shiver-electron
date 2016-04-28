const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index');
});

// router.get('/auth/twitch'); // Passport authentication.
// router.get('/auth/twitch/callback'); // Passport callback.

module.exports = router;
