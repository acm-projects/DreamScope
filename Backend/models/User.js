const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {type: String},
  email: { type: String, required: true, unique: true },
  totalDreams: {type: Number},
  fragDreams: {type: Number},
  detailedDreams: {type: Number},
  joinDate: { type: Date, default: Date.now},
  recurringPeople: [{type: String}],
  recurringObjects: [{type: String}],
  recurringSettings: [{type: String}],
  // people:,
  // objects:,
  // settings:,
  
});

module.exports = mongoose.model("User", User);