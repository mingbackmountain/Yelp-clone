var mongoose = require("mongoose");
var campgrounds = require("./models/campground");
var comment = require("./models/comment");

var data = [
  {
    name: "Mi Camp",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    description: "blah blah blah"
  },
  {
    name: "Mi Camp",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    description: "blah blah blah"
  },
  {
    name: "Mi Camp",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    description: "blah blah blah"
  },
  {
    name: "Mi Camp",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    description: "blah blah blah"
  }
];

function seedDB() {
  campgrounds.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("remove campgrounds");
    data.forEach(seed => {
      campgrounds.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`add campgrounds`);
          Comment.create(
            {
              text: "sdfd",
              author: "Homer"
            },
            function(err, comment) {
              campground.comments.push(comment);
              campground.save();
              console.log("Create comment");
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
