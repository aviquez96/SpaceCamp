var express = require('express');
var app = express();
var bodyParser = require ("body-parser");
var port = 3000;

// Global Variables
var campgrounds = [
    {name: "Salmon Creek", image: "https://photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Free-Photos"},
    {name: "Grannite Hill", image: "https://photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"}, 
    {name: "Mountain Tops", image: "https://photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"},
    {name: "Salmon Creek", image: "https://photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Free-Photos"},
    {name: "Grannite Hill", image: "https://photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"}, 
    {name: "Mountain Tops", image: "https://photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"},
    {name: "Salmon Creek", image: "https://photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Free-Photos"},
    {name: "Grannite Hill", image: "https://photosforclass.com/download/pixabay-1845906?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"}, 
    {name: "Mountain Tops", image: "https://photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f8c37ca3eeb7bf_960.jpg&user=Pexels"}
]

// allows to parse the body into an object
app.use(bodyParser.urlencoded({extended: true}));

// Sets the view folder engine to ejs, so we don't need to specify the file type in res.render
app.set("view engine", "ejs");

// Get Routes
app.get("/", function (req, res) {
    res.render('landing')
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
})
 
// Post Routes
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

app.listen(port, console.log("YelpCamp server is up!"));

