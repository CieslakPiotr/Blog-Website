import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

//Render files
app.get("/", (req, res) => {
    res.render('index.ejs', { posts: posts });
});

app.get("/newPosts", (req, res) => {
    res.render('newPost.ejs');
});

app.get("/about", (req, res) => {
    res.render('about.ejs');
});

app.get("/contact", (req, res) => {
    res.render('contact.ejs');
});

app.post("/submit", (req, res) => {
    const title = req.body["title"];
    const content = req.body["blog-text"];

    posts.push({ title: title, content: content });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});