var express = require('express')
// mergeParams true allows for routes including parameters, like /campgrounds/:id/... to make use of 
// those parameters
var router = express.Router({mergeParams: true})
var Campground = require("../models/campgrounds")
var Comment = require("../models/comment")

// Comments New
router.get('/new', isLoggedIn, function(req,res) {
    // Find campground by id
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    })
})

// Comments create
router.post('/', isLoggedIn, function(req,res) {
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
                    commentCreated.author.id = req.user._id;
                    commentCreated.author.username = req.user.username;
                    commentCreated.save();
                    foundCampground.comments.push(commentCreated);
                    foundCampground.save();
                    res.redirect('/campgrounds/' + foundCampground._id); 
                }
            })   
        }
    })
})

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

module.exports = router