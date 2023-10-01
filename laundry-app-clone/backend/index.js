//Create REST API
const express = require("express"),
  http = require("http");
const hostname = "localhost";
const port = 3000;
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(cors());

// Import router
// const chatRouter = require('./routers/chat');
const orderRouter = require('./routers/Order');

// Import models
// const Chat = require('./models/chat');

// Use routers

app.use("/orders", orderRouter)

// passport config
app.use(passport.initialize());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
