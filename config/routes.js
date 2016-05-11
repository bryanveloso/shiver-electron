'use strict';

import express from 'express';
import passport from './passport';
import path from 'path';
const router = express.Router();

passport.initialize();

router.get('/user', function(req, res) {
  if (req.user) {
    console.log(req.user.displayName);
  }
  res.json({})
});

router.get('/auth/twitch', passport.authenticate('twitch'));
router.get('/auth/twitch/callback',
    passport.authenticate('twitch', {
      successRedirect: '/',
      failureRedirect: '/'
    })
);
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(res, req, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

export default router;
