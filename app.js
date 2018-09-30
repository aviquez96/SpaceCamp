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
    image: String
})

// Turn scheema into a model 
var Campground = mongoose.model("Campground", campgroundSchema);

// DATABASE SETUP END //////////////////////////////////////////////////////////////////

// Model allows us to use mongo's functions
Campground.create(
    {
        name: "Mountain Tops", 
        image: "https://photosforclass.com/download/flickr-1514148183"
    } , function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
        }
});

// Global Variables
var campgrounds = [
    {name: "Salmon Creek", image: "https://photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Free-Photos"},
    {name: "Grannite Hill", image: "https://photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"}, 
    {name: "Mountain Tops", image: "https://photosforclass.com/download/flickr-1514148183"},
    {name: "Salmon Creek", image: "https://photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Free-Photos"},
    {name: "Grannite Hill", image: "https://photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"}, 
    {name: "Mountain Tops", image: "https://photosforclass.com/download/flickr-1514148183"},
    {name: "Salmon Creek", image: "https://photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Free-Photos"},
    {name: "Grannite Hill", image: "https://photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"}, 
    {name: "Mountain Tops", image: "https://photosforclass.com/download/flickr-1514148183"}
]

// GET ROUTES DEFINITION START //////////////////////////////////////////////////////////////////
app.get("/", function (req, res) {
    res.render('landing')
});

app.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB, then render
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    })
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})

// GET ROUTES DEFINITION END //////////////////////////////////////////////////////////////////
 
// POST ROUTES DEFINITION START ///////////////////////////////////////////////////////////////
app.post("/campgrounds", function (req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    // add to campgrounds array
    var newCampground = {name: name, image:image}

    campgrounds.push(newCampground)
    // redirect back to background
    res.redirect("/campgrounds");
})
// POST ROUTES DEFINITION START ///////////////////////////////////////////////////////////////

// App server listener
app.listen(port, console.log("YelpCamp server is up!"));

