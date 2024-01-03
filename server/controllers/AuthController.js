const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("../config");

class AuthController {
    static async signUp(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.body.login });
            if (user) {
                return res.status(400).json({ message: "This login is already exists" });
            }

            const hash = await bcrypt.hash(req.body.password, 5);

            let avatarFileName;
            console.log(req.files);
            if (req.files?.avatar_file) {
                const file = req.files.avatar_file;
                avatarFileName = `${uuidv4()}-${file.name.replaceAll(" ", "-")}`;

                await file.mv(`../server/public/avatars/${avatarFileName}`);
            }

            const doc = new UserModel({
                login: req.body.login,
                password_hash: hash,
                avatar_file: avatarFileName ?? null
            });
            await doc.save();

            res.status(201).json({ message: "Registration is successfully completed" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async signIn(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.body.login }, "-favorite_recipes -avatar_file");
            if (!user) {
                return res.status(404).json({ message: "Invalid password or login" });
            }

            const isValidPass = await bcrypt.compare(req.body.password, user.password_hash);
            if (!isValidPass) {
                return res.status(403).json({ message: "Invalid password or login" })
            }

            const token = jwt.sign(
                {
                    userId: user._id
                },
                config.SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            );

            const { password_hash, ...userData } = user._doc;

            res.json({ ...userData, token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId, "-password_hash");
            if (!user) {
                res.status(404).json({ message: "User is not found" });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = AuthController;