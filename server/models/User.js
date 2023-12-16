const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password_hash: {
            type: String,
            required: true
        },
        avatar_file: String,
        favorite_recipes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recipe"
            }
        ]
    }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;