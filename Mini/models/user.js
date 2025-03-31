const mongoose = require("mongoose");
require('dotenv').config();  // Add this line at the top of your file

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Set to 30 seconds (default is 10 seconds)
  })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("MongoDB Connection Error:", err));
const userSchema = new mongoose.Schema({
    name: String,
    message: String,
    subtime: String
}, { collection: "User" });
const User = mongoose.model("User", userSchema);
const saveUser = async (name, message, subtime) => {
    try {
        await User.create({ name, message, subtime });
        console.log("User inserted successfully");
    } catch (error) {
        console.error("Error inserting user:", error);
    }
};
const getUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.error("Error retrieving users:", error);
        return [];
    }
};
module.exports = { saveUser, getUsers };