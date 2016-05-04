# Shiver

> Bring Twitch outside your browser... but still on your desktop.

Shiver was created to scratch an itch. Twitch has some features that might be cool to some when it comes to being notified of when streams go live, like email. But that's tough, because I hate email notifications. Likewise, their iOS application has a good (albeit janky at times) push notification experience, but when I want to watch a stream, I don't want to necessarily watch it on my iPhone.

Enter Shiver.

### Wait, this looks familiar.

The first two versions of Shiver were built on Objective-C, as a native Mac OS X application. These served as two tremendous boons and learning activities for technologies like Objective-C and functional programming. But without being able to completely understand the ins and outs of these technologies, maintaining Shiver became difficult and tedious. That, on top of getting a job at Twitch killed any motivation to continue developing it.

This is an attempt to re-envision Shiver as essentially a web application living in GitHub's Electron environment. Given that my day job *is* working on the web, one would think this try would be a bit more fruitful.

## Development

    $ npm install

## Running

    $ npm start
    $ webpack --progress --colors --watch

(Run these in different tabs!)
