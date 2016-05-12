import express from 'express';
import passport from './passport';
import path from 'path';
const router = express.Router();
import db from './db';

// adding an explicit route for the boostrap html file so we can redirect to it reliably
router.get('/', (req, res) => res.sendFile(path.resolve('./app/app.html')));

router.get('/user', (req, res) => {
	db.findOne({ type: 'user' }, (err, user) => {
		res.json({ user });
	});
});

router.get('/auth/twitch', passport.authenticate('twitch'));
router.get('/auth/twitch/callback',
    passport.authenticate('twitch', {
	  successRedirect: '/',
      failureRedirect: '/auth/twitch'
    })
);

router.get('/logout', function(req, res) {
  req.logout();
  db.remove({}, { multi: true }, (err, numRemoved) => {});
  res.redirect('/');
});


function isLoggedIn(res, req, next) {  // ??? not sure what to do with this
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

export default router;
