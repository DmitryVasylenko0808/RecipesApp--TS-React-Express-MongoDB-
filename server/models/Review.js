const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: {
            type: String,
            required: true
        },
    }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;