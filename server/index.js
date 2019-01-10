const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || keys.mongoURI, { useNewUrlParser: true });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize());
app.use(passport.session());

// Require returns a function which is immediately invoked with the app object
require('./routes/authRoutes')(app);

// Serve up static assets (usually on heroku)
// Possibly don't need this
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Catch-all route for later once React side is setup - Sends every request to the React app
// Define any API routes before this runs
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now live at http://localhost:${PORT}!`);
});