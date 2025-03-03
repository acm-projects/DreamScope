const mongoose = require("mongoose");

const RecurringSettingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  place: { type: String },
  weather: { type: String },
  location: { type: String },
  time_of_day: { type: String },
});

module.exports = mongoose.model("RecurringSetting", RecurringSettingSchema);