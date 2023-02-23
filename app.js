const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItems: items }); //rendering should include all renderings together
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  console.log(req.body.list);
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item); 
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(3000, function () {
  console.log("Listening at port 3000");
});
