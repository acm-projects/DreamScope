const mongoose = require("mongoose");

const fullDate = new Date();
const date = (fullDate.getMonth() + 1).toString().padStart(2, '0') + '-' + fullDate.getDate().toString().padStart(2, '0') + '-' + fullDate.getFullYear();

const User = new mongoose.Schema({
  name: {type: String},
  email: { type: String, required: true, unique: true },
  profilePic: {type: String}, //change later
  totalDreams: {type: Number, default: 0},
  fragDreams: {type: Number, default: 0},
  detailedDreams: {type: Number, default: 0},
  joinDate: { type: String, default: date},
  recurringPeople: [{type: String}],
  recurringObjects: [{type: String}],
  recurringPlaces: [{type: String}],
  recurringThemes: [{type: String}],
  lastDreamLogged: { type: Number, default: null }, 
});
      


module.exports = mongoose.model("User", User);