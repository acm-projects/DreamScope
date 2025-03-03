const mongoose = require("mongoose");

const RecurringPeopleSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  name: { type: String },
  relation: { type: String },
  significance: { type: String }
});

module.exports = mongoose.model("RecurringPeople", RecurringPeopleSchema);