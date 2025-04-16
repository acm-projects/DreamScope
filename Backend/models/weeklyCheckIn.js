
const mongoose = require("mongoose");

const fullDate = new Date();
const date = (fullDate.getMonth() + 1).toString().padStart(2, '0') + '-' + fullDate.getDate().toString().padStart(2, '0') + '-' + fullDate.getFullYear();

const weeklyCheckIn = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        checkInArray: [{type: String}],
        dateArray: [{type: Date}]
    }
)

module.exports = mongoose.model("weeklyCheckIn", weeklyCheckIn);