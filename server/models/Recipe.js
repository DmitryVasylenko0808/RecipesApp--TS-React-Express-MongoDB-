const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        kind: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Kind",
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: Date,
        image: String,
        prep_time: Number,
        cook_time: Number,
        servings: Number,
        ingredients: [{ type: String }],
        directions: [{ type: String }],
        nutritions: {
            calories: Number,
            carbs: Number,
            fat: Number,
            protein: Number
        },
        ratings: {
            5: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            4: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            3: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        }
    }
);

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;