var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    app        = express();
const server = 1337;

mongoose.connect("mongodb://localhost/bloggah");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

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


// ============================
//     START SERVER          ==
// ============================

app.listen(server, function(){
  console.log("Started Server on " + server);
});