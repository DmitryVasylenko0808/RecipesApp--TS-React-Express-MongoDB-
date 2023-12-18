const RecipeModel = require("../models/Recipe");
const KindModel = require("../models/Kind");
const UserModel = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const ReviewModel = require("../models/Review");

class RecipeController {
    static async getAll(req, res) {
        try {
            const offset = 12;

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

    static async getKinds(req, res) {
        try {
            const kinds = await KindModel.find();

            if (!kinds.length) {
                return res.status(404).json({ message: "Kinds are not found" });
            }

            res.json(kinds);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getByUser(req, res) {
        try {
            const offset = 12;

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
            const offset = 12;

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

    static async edit(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            let updated;
            let imageFileName;
            if (req.files?.image_file) {
                const file = req.files.image_file;
                imageFileName = `${uuidv4()}-${file.name.replaceAll(" ", "-")}`;

                await file.mv(`../server/public/recipes/${imageFileName}`);

                updated = { ...data, image: imageFileName };
            } else {
                updated = { ...data };
            }

            await RecipeModel.updateOne(
                { _id: id },
                {
                    ...updated,
                    ingredients: JSON.parse(data.ingredients),
                    directions: JSON.parse(data.directions),
                    nutritions: {
                        calories: data.calories,
                        carbs: data.carbs,
                        fat: data.fat,
                        protein: data.protein
                    }
                }
            );

            res.json({ message: "Recipe is edited" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async rate(req, res) {
        try {
            const { value } = req.body;

            const recipe = await RecipeModel.findOne({
                _id: req.params.id,
                $or: [
                    { "ratings.1": { $in: [req.userId] } },
                    { "ratings.2": { $in: [req.userId] } },
                    { "ratings.3": { $in: [req.userId] } },
                    { "ratings.4": { $in: [req.userId] } },
                    { "ratings.5": { $in: [req.userId] } },
                ]
            });

            if (recipe) {
                return res.status(403).json({ message: "Recipe is already rated" });
            }

            await RecipeModel.updateOne(
                { _id: req.params.id },
                {
                    $push: {
                        [`ratings.${value}`]: req.userId
                    }
                }
            );

            res.json({ message: "Recipe is rated" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async delete(req, res) {
        try {
            await RecipeModel.deleteOne({ _id: req.params.id });
            await ReviewModel.deleteMany({ recipe: req.params.id });

            res.json({ message: "Recipe is deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = RecipeController;