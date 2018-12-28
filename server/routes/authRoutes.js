const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};


// app.get('/', (req, res) => {
//   res.send({ hi: 'there' });
// });

// Catch-all route for later once React side is setup - Sends every request to the React app
// Define any API routes before this runs
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });