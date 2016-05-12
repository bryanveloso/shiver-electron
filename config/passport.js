'use strict';

import passport from 'passport';
import { Strategy as TwitchStrategy } from 'passport-twitch';
import db from './db';
import config from './auth';


passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(user, done) { done(null, user) });

// Twitch.
passport.use(new TwitchStrategy({
      clientID: config.twitch.clientID,
      clientSecret: config.twitch.clientSecret,
      callbackURL: config.twitch.callbackURL,
      scope: config.twitch.scope
    },
    function(accessToken, refreshToken, profile, done) {

      process.nextTick(function() {
		  db.findOne({ id: profile.id, type: 'user' }, (err, foundUser) => {
          if (err) { return done(err); }
          if (foundUser) {
		    console.info(`found user in db: ${foundUser.username}`);
            return done(err, foundUser);  // We found a user! Return it.
          } else {

            const user = {
              id: profile.id,
              username: profile.username,
              displayName: profile.displayName,
			  logo: profile._json.logo,
			  type: 'user'
            };

            db.insert(user, function(err, newDoc) {
              done(err, newDoc);
            });
          }
        });
      });
    }
));

export default passport;
