const TwitchStrategy = require('passport-twitch').Strategy;
const config = require('./auth');

module.exports = function(passport) {
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
        console.log(profile);
      });
      done(null, profile);
    }
  ));
}
