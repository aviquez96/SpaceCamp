var mongoose = require('mongoose');

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

// Turn scheema into a model 
module.exports = mongoose.model("Campground", campgroundSchema);