var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash");
(Campground = require("./models/campgrounds")),
  (Comment = require("./models/comment")),
  (seedDb = require("./seeds")),
  (methodOverride = require("method-override"));
(passport = require("passport")),
  (LocalStrategy = require("passport-local")),
  (User = require("./models/user"));

//Requiring routes
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

// Constants
var port = 3000;

// Connection to the database
mongoose.connect(
  "mongodb://localhost/yelp_camp",
  { useNewUrlParser: true }
);
// allows to parse "body" into an object
app.use(bodyParser.urlencoded({ extended: true }));
// Sets the view folder engine to ejs, so we don't need to specify the file type in res.render
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDb(); seed the database

// Passport configuration
app.use(
  require("express-session")({
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// The preliminary routes are applicable to all the routes that belong to each route variable
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// App server listener
app.listen(port, console.log("YelpCamp server is up!"));
