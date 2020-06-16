var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();


//app config 
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb+srv://Eniko:Kekhod33@cluster0-jc7sm.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose/model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});



var Blog = mongoose.model("Blog", blogSchema);



//restful routes
app.get("/", function (req, res) {
    res.redirect("/blogs")
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});


app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("error")
        } else {
            console.log("it works");


            res.render("index", { blogs: blogs });

        }
    });


})

//NEW ROUTE
app.get("/blogs/new", function (req, res) {
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function (req, res) {
    Blog.create(req.body.blog, function(err, newBlog){
if(err) {
    res.render("new");
} else {
    res.redirect("/blogs")
}
    })
});

//SHOW ROUTE
app.get ("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog});
        }

});
});

//EDIT ROUTE
app.get("//blogs/:id/edit", function(req, res){
    res.render("edit");
})


app.listen(4000, function () {
    console.log("SERVER IS RUNNING")
});