var express = require('express'), 
    app = express(),
    bodyParser = require ("body-parser"),
    mongoose = require ("mongoose"),
    Campground = require ("./models/campgrounds"),
    Comment = require("./models/comment"),
    seedDb = require("./seeds"),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user')

// Constants 
var port = 3000;

// Connection to the database
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
// allows to parse "body" into an object
app.use(bodyParser.urlencoded({extended: true}));
// Sets the view folder engine to ejs, so we don't need to specify the file type in res.render
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
seedDb();

// Passport configuration
app.use(require("express-session")({
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// INDEX 
app.get("/", function (req, res) {
    res.render('landing')
});

// INDEX REAL (REST Convention) - lists all campgrounds
app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB, then render
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
})

// NEW Campgrounds Route (REST Convention) - Show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
})

// CREATE Route (REST Convention) - Add new campground to the database
app.post("/campgrounds", function (req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Model allows us to use mongo's functions
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
})

// SHOW Route (REST Convention) - Show information of 1 individual item
// Remember, this needs to be after /campgrounds/new cause otherwise it will get overwritten and never go to /new 
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// COMMENTS ROUTES  

app.get('/campgrounds/:id/comments/new', function(req,res) {
    // Find campground by id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    })
})

app.post('/campgrounds/:id/comments', function(req,res) {
    // lookup camgprounds using ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err); 
            res.redirect("/campgrounds");  
        } else {
            // create the new comment
            Comment.create(req.body.comment, function(err, commentCreated) {
                if (err) {
                    console.log(err);
                } else {
                    // associate comment with campground
                    foundCampground.comments.push(commentCreated);
                    foundCampground.save();
                    res.redirect('/campgrounds/' + foundCampground._id); 
                }
            })   
        }
    })
})

// App server listener
app.listen(port, console.log("YelpCamp server is up!"));

