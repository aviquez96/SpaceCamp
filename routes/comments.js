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

// EDIT ROUTE
router.get("/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect('back');
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
        }
    })
})

// UPDATE ROUTE
router.put("/:comment_id", function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// DESTROY ROUTE
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
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