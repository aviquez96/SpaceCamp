var express = require("express");
// mergeParams true allows for routes including parameters, like /campgrounds/:id/... to make use of
// those parameters
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
  // Find campground by id
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground });
    }
  });
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
  // lookup camgprounds using ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
      req.flash("error", "Something went wrong");
      res.redirect("/campgrounds");
    } else {
      // create the new comment
      Comment.create(req.body.comment, function(err, commentCreated) {
        if (err) {
          req.flash("error", "Something went wrong");
          console.log(err);
        } else {
          // associate comment with campground
          commentCreated.author.id = req.user._id;
          commentCreated.author.username = req.user.username;
          commentCreated.save();
          foundCampground.comments.push(commentCreated);
          foundCampground.save();
          req.flash("success", "Successfully added comment");
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
    }
  });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;
