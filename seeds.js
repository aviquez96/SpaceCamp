var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "Beauty Explosion", 
        image:"https://photosforclass.com/download/pixabay-2742113?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Feb32b50d29f5023ed1584d05fb1d4e97e07ee3d21cac104491f0c17cafefb4b8_960.jpg&user=geralt",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Spacial Imagination", 
        image: "https://photosforclass.com/download/pixabay-2643089?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Feb33b50c28fc083ed1584d05fb1d4e97e07ee3d21cac104496f9c07da1eeb4b8_960.jpg&user=geralt",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "The astroboi", 
        image:"https://photosforclass.com/download/flickr-15960607948",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        // if (err) {
        //     console.log(err);
        // }
        // console.log("Removed Campgrounds!");
        // // Add campgrounds - it is here since inside callback
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("added campground");
        //             //create a comment
        //             Comment.create(
        //                 {   
        //                     text: "This place is great!",
        //                     author: "Homer",            
        //                 }, function (err, comment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new Comment");
        //                     }
        //                 }
        //             )
        //         }
        //     })
        // })
    })
}

module.exports = seedDB;

