const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }
    }
);

const TypeModel = mongoose.model("Type", TypeSchema);

module.exports = TypeModel;