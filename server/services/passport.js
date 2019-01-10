const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
      .then(existingUser => {
        if(existingUser) {
          // we already have a record with googleId
          done(null, existingUser);
        } else {
          // we have no record with that googleId
          new User({ googleId: profile.id }).save()
          .then(user => done(null, user));
        }
      });
      // User.findOneAndUpdate(
      //   { googleId: profile.id },
      //   { upsert: true, new: true, runValidators: true },function (err, doc) { // callback
      //     if (err) {
      //       console.log(err);  // handle error
      //     } else {
      //       console.log(doc);  // handle document
      //     }
      // });

      
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);
