const RecipeModel = require("../models/Recipe");
const KindModel = require("../models/Kind");
const UserModel = require("../models/User");
const { v4: uuidv4 } = require("uuid");

class RecipeController {
    static async getAll(req, res) {
        try {
            const offset = 5;

            let { page, sortDate, kind } = req.query;
            page = parseFloat(page) - 1;
            sortDate = parseFloat(sortDate);

            const filter = {};
            if (kind) {
                filter.kind = kind;
            }

            const recipes = await RecipeModel
                .find(filter, "title date ratings kind image ratings")
                .skip(page * offset)
                .limit(offset)
                .sort({ date: sortDate })
                .populate("kind", "title");

            if (!recipes.length) {
                return res.status(404).json({ message: "Data of recipes is empty" });
            }

            res.json(recipes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getOneById(req, res) {
        try {
            const recipe = await RecipeModel
                .findById(req.params.id)
                .populate("author kind", "login title");

            if (!recipe) {
                return res.status(404).json({ message: "Recipe is not found" });
            }

            res.json(recipe);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getFavorites(req, res) {
        try {
            const offset = 5;

            const { userId } = req.params;
            // let { page, sortDate, kind } = req.query;
            // page = parseFloat(page) - 1;
            // sortDate = parseFloat(sortDate);

            // const filter = { _id: userId };
            // if (kind) {
            //     filter.kind = kind;
            // }

            const data = await UserModel
                .findById(userId)
                .populate({
                    path: "favorite_recipes",
                    select: "title date ratings kind image ratings",
                    populate: {
                        path: "kind",
                        select: "title"
                    }
                });
            const recipes = data.favorite_recipes;

            res.json(recipes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getByUser(req, res) {
        try {
            const offset = 5;

            const { userId } = req.params;
            let { page, sortDate, kind } = req.query;
            page = parseFloat(page) - 1;
            sortDate = parseFloat(sortDate);

            const filter = { author: userId };
            if (kind) {
                filter.kind = kind;
            }

            const recipes = await RecipeModel
                .find(filter, "title date ratings kind image ratings")
                .skip(page * offset)
                .limit(offset)
                .sort({ date: sortDate })
                .populate("kind", "title");

            res.json(recipes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getSearched(req, res) {
        try {
            const offset = 5;

            const regex = new RegExp(`.*${req.params.value}.*`);

            let { page, sortDate, kind } = req.query;
            page = parseFloat(page) - 1;
            sortDate = parseFloat(sortDate);

            const filter = { title: { $regex: regex, $options: "i" } };
            if (kind) {
                filter.kind = kind;
            }

            const recipes = await RecipeModel
                .find(filter, "title date ratings kind image ratings")
                .skip(page * offset)
                .limit(offset)
                .sort({ date: sortDate })
                .populate("kind", "title");

            res.json(recipes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;

            let imageFileName;
            if (req.files?.image_file) {
                const file = req.files.image_file;
                imageFileName = `${uuidv4()}-${file.name.replaceAll(" ", "-")}`;

                await file.mv(`../server/public/recipes/${imageFileName}`);
            }

            const doc = new RecipeModel({
                ...data,
                author: req.userId,
                image: imageFileName ?? null,
                ingredients: JSON.parse(data.ingredients),
                directions: JSON.parse(data.directions),
                nutritions: {
                    calories: data.calories,
                    carbs: data.carbs,
                    fat: data.fat,
                    protein: data.protein
                }
            });
            await doc.save();

            res.json({ message: "Recipe is successfully created" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async addFavorite(req, res) {
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

    static async edit(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async delete(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async deleteFavorite(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = RecipeController;