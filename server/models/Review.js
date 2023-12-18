const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;