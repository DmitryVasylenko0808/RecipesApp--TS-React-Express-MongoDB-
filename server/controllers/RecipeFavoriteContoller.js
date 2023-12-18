const UserModel = require("../models/User");

class RecipeFavoriteController {
    static async get(req, res) {
        try {
            const offset = 12;

            const { userId } = req.params;
            let { page, sortDate, kind } = req.query;
            page = parseFloat(page) - 1;
            sortDate = parseFloat(sortDate);

            const data = await UserModel
                .findById(userId, "favorite_recipes")
                .populate({
                    path: "favorite_recipes",
                    select: "title date ratings kind image ratings",
                    populate: {
                        path: "kind",
                        select: "title"
                    }
                });

            let recipes = data.favorite_recipes;
            if (kind) {
                recipes = recipes.filter(r => r.kind._id.toString() === kind);
            }
            if (sortDate) {
                if (sortDate === 1) recipes = recipes.sort((a, b) => a.date - b.date);
                else if (sortDate === -1) recipes = recipes.sort((a, b) => b.date - a.date);
            }
            recipes = recipes.slice(page * offset, page + offset);

            res.json(recipes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async add(req, res) {
        try {
            await UserModel.updateOne(
                { _id: req.userId },
                {
                    $push: {
                        favorite_recipes: req.body.id
                    }
                }
            );

            res.json({ message: "Recipe is added" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async delete(req, res) {
        try {
            await UserModel.updateOne(
                { _id: req.userId },
                {
                    $pull: {
                        favorite_recipes: req.params.id
                    }
                }
            );

            res.json({ message: "Recipe is deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = RecipeFavoriteController;