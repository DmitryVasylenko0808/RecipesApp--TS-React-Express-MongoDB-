const UserModel = require("../models/User");
const { v4: uuidv4 } = require("uuid");

class ProfileController {
    static async getById(req, res) {
        try {
            const user = await UserModel.findById(req.params.id, "-password_hash -favorite_recipes");
            if (!user) {
                return res.status(404).json({ message: "Profile is not found" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async edit(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.body.login });

            const isLoginExists = user && user._id.toString() !== req.userId;
            if (isLoginExists) {
                return res.status(400).json({ message: "This login is already exists" });
            }

            const editData = {
                login: req.body.login
            };

            if (req.files?.avatar_file) {
                const file = req.files.avatar_file;
                const avatarFileName = `${uuidv4()}-${file.name.replaceAll(" ", "-")}`;

                await file.mv(`../server/public/avatars/${avatarFileName}`);

                editData.avatar_file = avatarFileName;
            }

            await UserModel.updateOne({ _id: req.userId }, editData);

            res.json({ message: "Profile is edited" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async delete(req, res) {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: "Profile is not found" });
            }

            await UserModel.deleteOne({ _id: req.userId });

            res.json({ message: "Profile is deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = ProfileController;