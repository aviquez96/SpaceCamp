var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "Beauty Explosion", 
        image:"https://photosforclass.com/download/pixabay-1492818?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe831b80d20f5093ed1584d05fb1d4e97e07ee3d21cac104496f9c07da1eeb4b8_960.jpg&user=ipicgr",
        description: "This space shit is awesome!"
    },
    {
        name: "Spacial Imagination", 
        image: "https://photosforclass.com/download/pixabay-2643089?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Feb33b50c28fc083ed1584d05fb1d4e97e07ee3d21cac104496f9c07da1eeb4b8_960.jpg&user=geralt",
        description: "This space shit is awesome!"
    },
    {
        name: "The astroboi", 
        image:"https://photosforclass.com/download/flickr-15960607948",
        description: "This space shit is awesome!"
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed Campgrounds!");
        // Add campgrounds - it is here since inside callback
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added campground");
                    //create a comment
                    Comment.create(
                        {   
                            text: "This place is great!",
                            author: "Homer",            
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new Comment");
                            }
                        }
                    )
                }
            })
        })
    })
}

module.exports = seedDB;

