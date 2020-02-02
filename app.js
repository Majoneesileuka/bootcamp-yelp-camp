// Set up requirements
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

// Connect mongodb and use bodyparser and set ejs as view enginer
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

// Create Campground model
var Campground = mongoose.model("Campground", campgroundSchema);

/*
Campground.create(
{
	name: "Granite Hill",
	image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "This is a huge granite hill, not bathrooms. No water, Beautiful granite!"
}, function(err, campground) {
	if (err) {
		console.log(err);
	} else {
		console.log("Newly created Campground");
		console.log(campground);
	}
});
*/

// REST routes
app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX -- Show all campgrounds
app.get('/campgrounds', function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
    		res.render('index', { campgrounds: allCampgrounds });
		}
	});
});

// CREATE -- Add new campground to the DB
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };
    // Create a new campground and save to DB, redirect to GET /campgrounds
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW - Show form to create new campground
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

// SHOW -- Show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	// Find the campground with provided ID and render the show page
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});

// Start server
app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log('The YelpCamp Server Has Started');
});