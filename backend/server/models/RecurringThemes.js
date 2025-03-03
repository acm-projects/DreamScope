const mongoose = require("mongoose");

const RecurringThemesSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  emotions: [String],
  mood: { type: String },
});

module.exports = mongoose.model("RecurringThemes", RecurringThemesSchema);
