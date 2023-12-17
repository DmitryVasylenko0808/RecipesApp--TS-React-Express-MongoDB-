const RecipeModel = require("../models/Recipe");
const KindModel = require("../models/Kind");
const UserModel = require("../models/User");

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
                res.status(404).json({ message: "Data of recipes is empty" });
            }

            res.json(recipes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getOneById(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getFavorites(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getByUser(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getSearched(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async create(req, res) {
        try {

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async addFavorite(req, res) {
        try {

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