var express = require('express')
var router = express.Router()
var Campground = require('../models/campgrounds')

// INDEX REAL (REST Convention) - lists all campgrounds
router.get("/", function (req, res) {
    // Get all campgrounds from DB, then render
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
})

// NEW Campgrounds Route (REST Convention) - Show form to create new campground
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new.ejs");
})

// CREATE Route (REST Convention) - Add new campground to the database
router.post("/", isLoggedIn, function (req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, author: author};
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
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;