var express = require('express'), 
    app = express(),
    bodyParser = require ("body-parser"),
    mongoose = require ("mongoose");

// Constants 
var port = 3000;

// allows to parse "body" into an object
app.use(bodyParser.urlencoded({extended: true}));
// Sets the view folder engine to ejs, so we don't need to specify the file type in res.render
app.set("view engine", "ejs");

// DATABASE SETUP START //////////////////////////////////////////////////////////////////

// Connection to the database
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

// Turn scheema into a model 
var Campground = mongoose.model("Campground", campgroundSchema);

// DATABASE SETUP END //////////////////////////////////////////////////////////////////

// GET ROUTES DEFINITION START //////////////////////////////////////////////////////////////////
app.get("/", function (req, res) {
    res.render('landing')
});

// INDEX Route (REST Convention) - show all campgrounds
app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB, then render
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
})

// NEW Route (REST Convention) - Show form to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})

// SHOW Route (REST Convention) - Show information of 1 individual item
// Remember, this needs to be after /campgrounds/new cause otherwise it will get overwritten and never go to /new 
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    })
})

// GET ROUTES DEFINITION END //////////////////////////////////////////////////////////////////
 
// Campground.create (
//     {
//         name: "Granite Hill",
//         image: "https://photosforclass.com/download/flickr-1514148183",
//         description: "A beautiful destination for you and your family!"
//     }, function (err, newCampground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Campground has been created");
//         }

//     }); 

// POST ROUTES DEFINITION START ///////////////////////////////////////////////////////////////
// CREATE Route (REST Convention) - Add new campground to database
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

// POST ROUTES DEFINITION START ///////////////////////////////////////////////////////////////

// App server listener
app.listen(port, console.log("YelpCamp server is up!"));

