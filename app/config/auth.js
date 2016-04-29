var scope = [
  'channel_feed_read',
  'channel_read',
  'chat_login',
  'user_follows_edit',
  'user_read',
  'user_subscriptions'
]

var ids = {
  twitch: {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: 'http://localhost:3030/auth/twitch/callback',
    scope: scope.join(' ')
  }
};

module.exports = ids;
