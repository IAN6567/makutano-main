const express = require("express");
const app = express();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ian@2023",
  database: "socialapp",
  port: 3306,
});
//middlewares
app.use(express.urlencoded({ extended: true })); //to
//parse incoing/request from data
//routes
app.get("/", (req, res) => {
  //render posts
  connection.query("SELECT *FROM posts limit 6", (dberr, results) => {
    if (dberr) {
      return res.status(500).send("Error retrieving posts" + dberr);
    }
    res.render("index.ejs", { posts: results });
  });
});
app.post("/newpost", (req, res) => {
  //sql insers into
  console.log(req.body.content);
  connection.query(
    `INSERT INTO posts(content,postowner)VALUES("${req.body.content})",2)`,
    (dberr) => {
      if (dberr) {
        return res.status(500).send("Error storing data" + dberr);
      }
      res.redirect("/");
    }
  );
});
//try adding a new user from a submission  create newuser.js file,newuser get route and newuser post route
app.get("/newuser",(req,res)=>{
  res.render("newuser.ejs");
})
app.post("/newuser",(req,res)=>{
  console.log(req.body);
  const{fullname,email,password}=req.body;
  connection.query("INSERT INTO users(fullname,email,password)values(`${fullname}")
})
// routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/users", (req, res) => {
  console.log(req.query.id);
  console.log(req.query.person);
  connection.query("SELECT * FROM users", (dberr, results) => {
    if (dberr) {
      return res.status(500).send("Error retrieving users" + dberr);
    }
    res.render("users.ejs", { users: results });
  });
});
app.get("/posts", (req, res) => {});
// 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
// Start the app
app.listen(3003, () => console.log("App running on http://127.0.0.1:3003"));
