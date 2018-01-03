var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    app            = express();
const server = 1337;

mongoose.connect("mongodb://localhost/bloggah");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// ============================
//     SCHEMA                ==
// ============================

var postSchema = mongoose.Schema({
   title: String,
   body:  String,
   image: String,
   created: {type: Date, default: Date.now}
});

var Post = mongoose.model("posts", postSchema);

// Post.create(
//     {
//      title:"What do you know, it works!!",
//      body: "Lots of good stuff here...  Lorem Ipsum is dead!!",
//      image: "https://static.pexels.com/photos/261579/pexels-photo-261579.jpeg"
//     }, function(err, newlyCreated){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("created new post: " + newlyCreated);
//         }
//     });
// ============================
//         GET Routes        ==
// ============================

//  REDIRECT FROM ROOT TO /POSTS
app.get("/", function(req, res){
    res.redirect("/posts")
});

// POSTS INDEX ROUTE
app.get("/posts", function(req, res){
    Post.find({}, function(err, posts){
      if(err){
          console.log(err);
      }  else {
          res.render("index", {posts:posts});
      }
    });

});

//  NEW ROUTE

app.get("/posts/new", function(req, res){
   res.render("new")
});

//  SHOW ROUTE

app.get("/posts/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
            res.redirect("/posts");
        } else {
            res.render("show", {post:foundPost});
        }
    });
});

//  EDIT ROUTE

app.get("/posts/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/posts");
        } else {
            res.render("edit", {post:foundPost});
        }
    });

});


// ============================
//    POST ROUTES            ==
// ============================

//  CREATE ROUTE

app.post("/posts", function(req, res){
    Post.create(req.body.post, function(err, newPost){
        if(err){
            console.log(err);
            res.render("new");
        } else {
            res.redirect("/posts")
        }
    });
});

// UPDATE ROUTE

app.put("/posts/:id", function(req, res){
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("/posts")
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

// ============================
//     START SERVER          ==
// ============================

app.listen(server, function(){
  console.log("Started Server on " + server);
});