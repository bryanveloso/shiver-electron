'use strict';

const TwitchStrategy = require('passport-twitch').Strategy;
const config = require('./auth');


module.exports = function(db, passport) {
  passport.serializeUser(function(user, done) { done(null, user) });
  passport.deserializeUser(function(user, done) { done(null, user) });

  // Twitch.
  passport.use(new TwitchStrategy({
      clientID: config.twitch.clientID,
      clientSecret: config.twitch.clientSecret,
      callbackURL: config.twitch.callbackURL,
      scope: config.twitch.scope,
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        db.findOne({ id: profile.id }, function(err, user) {
          if (err) { return done(err); }
          if (user) {
            return done(err, user);  // We found a user! Return it.
          } else {
            var user = {
              id: profile.id,
              username: profile.username,
              displayName: profile.displayName
            }
            db.insert(user, function(err, newDoc) {
              done(err, newDoc);
            })
          }
        });
      });
    }
  ));
}
