const RecipeModel = require("../models/Recipe");
const ReviewModel = require("../models/Review");

class ReviewController {
    static async get(req, res) {
        try {
            const offset = 10;

            let { page, sortDate } = req.query;
            page = parseFloat(page) - 1;
            sortDate = parseFloat(sortDate);

            const reviews = await ReviewModel
                .find({ recipe: req.params.recipeId }, "-recipe")
                .skip(page * offset)
                .limit(offset)
                .populate("author", "login avatar_file")
                .sort({ createdAt: sortDate });

            res.json(reviews);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async add(req, res) {
        try {
            const recipe = await RecipeModel.findById(req.body.recipeId);
            if (!recipe) {
                return res.status(404).json({ message: "Recipe is not found" });
            }

            const review_doc = new ReviewModel({
                recipe: req.body.recipeId,
                author: req.userId,
                text: req.body.text
            });
            await review_doc.save();

            res.json({ message: "Review is added" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = ReviewController;