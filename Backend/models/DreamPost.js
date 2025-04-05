const mongoose = require("mongoose");

const DreamPost = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   title: { type: String, required: true },
   type: { type: String, enum: ["Detailed", "Fragmented"], required: true },
   dreamText: { type: String }, 
   dreamFragments: [{ type: String }],
   analysis: {type: String},
   //Optional user selections
   selectedThemes: [{ type: String }], 
   selectedSettings: [{ type: String }],
   selectedEmotions: [{ type: String }],
   date: { type: Date, default: Date.now },
   visualizations: [{type: String}],
   dreamPeople: [{type: String}],
   dreamObjects: [{type: String}],
   dreamPlaces: [{type: String}],
   dreamThemes: [{type: String}],
});

module.exports = mongoose.model("DreamPost", DreamPost);
