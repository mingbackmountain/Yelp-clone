var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  campgrounds = require("./models/campground");
seedDB = require("./seed");

seedDB();
var app = express();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX -show all campgrounds
app.get("/campgrounds", function(req, res) {
  campgrounds.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE -add new campground into DB
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };

  //Create a new campground and save to DB
  campgrounds.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//NEW - show the form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

//SHOW -show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //find campground
  campgrounds.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen("3000", function() {
  console.log("yelpcamp server has started");
});
