const express = require("express");
const path = require("path");
const app = express();
const { saveUser, getUsers } = require("./models/user.js");
app.use(express.static(path.join(__dirname, "views")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    const users = await getUsers();
    res.render("index", { users });
});
app.post("/submit", async (req, res) => {
    const { name, message } = req.body;
    const time=new Date();
    const subtime = `${time.getHours()}:${time.getMinutes()} , ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;

    await saveUser(name, message,subtime);
    res.redirect("/");
}); 
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});