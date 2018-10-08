const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

// Serve up static assets (usually on heroku)
// Possibly don't need this
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Catch-all route for later once React side is setup - Sends every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});